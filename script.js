const TELEGRAM_ID = "your_id"; //yaser11b

let cart = [];

function toFa(n) {
  return n.toLocaleString("fa-IR");
}

function render() {
  const list = document.getElementById("cart-items");
  list.innerHTML = "";
  let total = 0;

  cart.forEach(function (item, index) {
    total += item.price;
    const li = document.createElement("li");
    li.textContent = item.name + " - " + toFa(item.price) + " تومان ";

    const del = document.createElement("button");
    del.textContent = "حذف";
    del.onclick = function () {
      cart.splice(index, 1);
      render();
    };

    li.appendChild(del);
    list.appendChild(li);
  });

  document.getElementById("cart-total").textContent = toFa(total);
  document.getElementById("cart-count").textContent = toFa(cart.length);
}

function sendOrder() {
  if (cart.length === 0) {
    alert("سبد خرید خالیه");
    return;
  }
  let total = 0;
  let text = "سلام، می‌خوام این سفارش رو ثبت کنم:\n\n";
  cart.forEach(function (item, i) {
    total += item.price;
    text += (i + 1) + ". " + item.name + " - " + toFa(item.price) + " تومان\n";
  });
  text += "\nجمع کل: " + toFa(total) + " تومان";
  window.open(
    "https://t.me/" + TELEGRAM_ID + "?text=" + encodeURIComponent(text),
    "_blank"
  );
}

document.querySelectorAll(".add-btn").forEach(function (btn) {
  btn.onclick = function () {
    cart.push({
      name: btn.dataset.name,
      price: Number(btn.dataset.price)
    });
    render();
  };
});

const orderBtn = document.createElement("button");
orderBtn.textContent = "ثبت سفارش در تلگرام";
orderBtn.onclick = sendOrder;
document.getElementById("cart-items").insertAdjacentElement("afterend", orderBtn);