// Kiểm tra dữ liệu Đăng ký
$(document).ready(function () {
    // Khi nhấn nút Đăng ký
    $("#btnDangKy").click(function () {
        let user = $("#txtUsername").val();
        let pass = $("#txtPassword").val();
        let email = $("#txtEmail").val();

        if (user == "" || pass == "") {
            alert("Vui lòng không để trống tên đăng nhập và mật khẩu!");
            return false;
        }

        // Lưu thông tin vào LocalStorage (Yêu cầu 2)
        localStorage.setItem("username", user);
        alert("Đăng ký thành công!");
        window.location.href = "login.html"; // Chuyển sang trang đăng nhập
    });
});


// --- BẮT ĐẦU: XỬ LÝ GIAO DIỆN KHI ĐÃ ĐĂNG NHẬP ---
let currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (currentUser) {
    // 1. Tìm thẻ <li> chứa nút Đăng nhập (dựa vào href)
    let loginMenuItem = $('a[href="dang-nhap.html"]').parent();

    // 2. Thay thế nút "Đăng nhập" thành Dropdown thông tin User
    loginMenuItem.html(`
        <div class="dropdown">
            <a class="btn btn-outline-light dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                👤 Chào, ${currentUser.name}
            </a>
            <ul class="dropdown-menu dropdown-menu-end shadow">
                <li><a class="dropdown-item" href="#">Hồ sơ của tôi</a></li>
                <li><a class="dropdown-item" href="dat-phong.html">Đơn đặt phòng</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item text-danger fw-bold" href="#" onclick="logoutUser()">Đăng xuất</a></li>
            </ul>
        </div>
    `);

    // 3. (Tuỳ chọn) Nếu user đang ở trang đăng nhập/đăng ký mà đã login rồi thì đá về trang chủ
    let currentUrl = window.location.href;
    if (currentUrl.includes('dang-nhap.html') || currentUrl.includes('dang-ky.html')) {
        window.location.href = 'index.html';
    }
}
// --- KẾT THÚC: XỬ LÝ GIAO DIỆN ---

// --- HÀM ĐĂNG XUẤT ---
window.logoutUser = function () {
    if (confirm('Bạn có chắc chắn muốn đăng xuất không?')) {
        // Xóa thông tin user đang đăng nhập (nhưng không xóa tài khoản đã đăng ký)
        localStorage.removeItem('currentUser');

        // Load lại trang web để menu quay về như cũ
        window.location.reload();
    }
}

// Xử lý Giỏ hàng
// Lưu sản phẩm vào giỏ
function addToCart(productName, price) {
    // 1. Lấy danh sách đã có từ localStorage
    // Nếu chưa có gì thì tạo một mảng rỗng []
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    // 2. Tạo đối tượng sản phẩm mới
    let newRoom = {
        name: productName,
        price: price
    };
    //3. Thêm sản phẩm mới vào mảng giỏ hàng
    cart.push(newRoom);

    // 4. Lưu lại mảng giỏ hàng đã cập nhật vào localStorage
    localStorage.setItem("myCart", JSON.stringify(cart));
    alert("Đã thêm " + productName + " vào đơn đặt phòng thành công!");
}


// Hiển thị thông tin người dùng trên Header
$(document).ready(function () {
    let currentUser = localStorage.getItem("username");
    if (currentUser) {
        $("#user-info").html("Chào mừng, " + currentUser);
    }
});



// Hàm chuyển trang
// Biến lưu trữ trang hiện tại
let currentPage = 1;
const totalPages = 2; // Tổng số trang của bạn là 2

// Hàm chuyển trang được gán vào thẻ <a>
window.changePage = function (page) {
    // 1. Xác định trang mục tiêu
    if (page === 'prev') {
        if (currentPage > 1) currentPage--;
    } else if (page === 'next') {
        if (currentPage < totalPages) currentPage++;
    } else {
        currentPage = page; // Bấm trực tiếp vào số 1 hoặc 2
    }

    // 2. Ẩn tất cả các trang, sau đó hiện trang mục tiêu với hiệu ứng mờ dần
    $('.room-page').hide();
    $('#page-' + currentPage).fadeIn(400);

    // 3. Xóa class 'active' ở tất cả các số, thêm vào số hiện tại
    $('.page-item').removeClass('active');
    $('#btn-page-' + currentPage).addClass('active');

    // 4. Xử lý trạng thái (Bật/Tắt) của nút 'Trước' và 'Sau'
    if (currentPage === 1) {
        $('#btn-prev').addClass('disabled');
        $('#btn-next').removeClass('disabled');
    } else if (currentPage === totalPages) {
        $('#btn-prev').removeClass('disabled');
        $('#btn-next').addClass('disabled');
    } else {
        // Nếu có nhiều hơn 2 trang (ví dụ ở trang 2 của 3 trang)
        $('#btn-prev').removeClass('disabled');
        $('#btn-next').removeClass('disabled');
    }

    // Tùy chọn: Cuộn mượt mà lên đầu danh sách phòng khi chuyển trang
    $('html, body').animate({
        scrollTop: $("#page-1").offset().top - 100 // Trừ 100px để không bị menu che lấp
    }, 500);
}

function sortRoomsByPrice() {
    let sortType = $('#sortRooms').val();
    if (sortType === 'default') return;

    // 1. Thu thập tất cả các thẻ phòng từ cả 2 trang
    let allRooms = $('.room-page > div').get();

    // 2. Thực hiện sắp xếp
    allRooms.sort(function(a, b) {
        // Lấy giá tiền và chuyển về dạng số (xóa dấu phẩy và chữ VNĐ)
        let priceA = parseInt($(a).find('.text-danger').text().replace(/[^0-9]/g, ''));
        let priceB = parseInt($(b).find('.text-danger').text().replace(/[^0-9]/g, ''));

        if (sortType === "1") {
            return priceA - priceB; // Thấp đến Cao
        } else if (sortType === "2") {
            return priceB - priceA; // Cao đến Thấp
        }
        return 0;
    });

    // 3. Xóa nội dung cũ ở các trang
    $('#page-1, #page-2').empty();

    // 4. Chia lại 12 phòng vào 2 trang (6 phòng mỗi trang)
    allRooms.forEach((room, index) => {
        if (index < 6) {
            $('#page-1').append(room);
        } else {
            $('#page-2').append(room);
        }
    });

    // 5. Sau khi sắp xếp, nên đưa người dùng về trang 1 để xem kết quả từ đầu
    if (typeof changePage === 'function') {
        changePage(1);
    }
}