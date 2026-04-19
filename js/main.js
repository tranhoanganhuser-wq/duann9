// Kiểm tra dữ liệu Đăng ký
$(document).ready(function() {
    // Khi nhấn nút Đăng ký
    $("#btnDangKy").click(function() {
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

// Xử lý Giỏ hàng
// Lưu sản phẩm vào giỏ
function addToCart(productName, price) {
    let cart = {
        name: productName,
        price: price
    };
    // Chuyển đối tượng thành chuỗi JSON để lưu vào LocalStorage
    localStorage.setItem("cartItem", JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng!");
}

// Hiển thị thông tin người dùng trên Header
$(document).ready(function() {
    let currentUser = localStorage.getItem("username");
    if (currentUser) {
        $("#user-info").html("Chào mừng, " + currentUser);
    }
});


$(document).ready(function() {
    // Kiểm tra xem có ai ĐANG đăng nhập không (dùng key currentUser vừa tạo ở Bước 1)
    let activeUser = JSON.parse(localStorage.getItem('currentUser'));

    if (activeUser) {
        // NẾU ĐÃ ĐĂNG NHẬP:
        $("#user-info").html("Chào mừng, " + activeUser.name); // Hiện tên
        $("#btn-login").addClass("d-none");                     // Ẩn nút Đăng nhập
        $("#btn-logout").removeClass("d-none");                 // Hiện nút Đăng xuất
    } else {
        // NẾU CHƯA ĐĂNG NHẬP:
        $("#user-info").empty();                                // Xóa tên
        $("#btn-login").removeClass("d-none");                  // Hiện nút Đăng nhập
        $("#btn-logout").addClass("d-none");                    // Ẩn nút Đăng xuất
    }

    // XỬ LÝ NÚT ĐĂNG XUẤT
    $("#btn-logout").on("click", function() {
        // Xóa trạng thái đang đăng nhập
        localStorage.removeItem('currentUser'); 
        alert("Bạn đã đăng xuất!");
        // Load lại trang để giao diện quay về như cũ
        window.location.reload(); 
    });
});




// Hàm chuyển trang
// Biến lưu trữ trang hiện tại
let currentPage = 1;
const totalPages = 2; // Tổng số trang của bạn là 2

// Hàm chuyển trang được gán vào thẻ <a>
window.changePage = function(page) {
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
