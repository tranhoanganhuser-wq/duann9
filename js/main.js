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

// Hàm chuyển trang
function chuyenTrang(page) {
    if (page === 1) {
        // QUAN TRỌNG: Hiện 1 và phải ẨN 2
        $("#row-page-1").show(); 
        $("#row-page-2").hide(); 
        
        // Cập nhật trạng thái nút
        $("#btn-page-1").addClass("active");
        $("#btn-page-2").removeClass("active");
    } else if (page === 2) {
        // Ngược lại: ẨN 1 và HIỆN 2
        $("#row-page-1").hide();
        $("#row-page-2").show();
        
        // Cập nhật trạng thái nút
        $("#btn-page-2").addClass("active");
        $("#btn-page-1").removeClass("active");
    }

    
    // Cuộn màn hình lên đầu danh sách để người dùng dễ nhìn
    $('html, body').animate({
        scrollTop: $(".row").offset().top - 100
    }, 500);
}