
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

document.querySelectorAll(".add-btn").forEach(function (btn) {
  btn.onclick = function () {
    cart.push({
      name: btn.dataset.name,
      price: Number(btn.dataset.price)
    });
    render();
  };
});