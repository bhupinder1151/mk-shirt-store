function loadingState(status, button) {
  if (status) {
    button.getElementsByClassName("_xl-btn-loading")[0].style.display = "block";
    button.disabled = true;
    button.classList.toggle("_xl-btn-disable");
  } else {
    button.getElementsByClassName("_xl-btn-loading")[0].style.display = "none";
    button.disabled = false;
    button.classList.toggle("_xl-btn-disable");
  }
}

function openCartDrawer() {
  if (window.location.href.includes('opendrawer=true')) {
    window.location.reload();
  } else{
    if (window.location.href.includes('?')) {
      window.location.href = window.location.href +'&opendrawer=true';
    }else{
      window.location.href = window.location.href +'?&opendrawer=true';
    }
  }
}

async function clearCart() {
  try {
    const response = await fetch(window.Shopify.routes.root + "cart/clear.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{}]),
    });
    const json = await response.json();
    console.log("Clear Cart ", json);
  } catch (error) {
    console.log("Clear Cart Error ", error);
  }
}

async function addToCart(formData) {
  try {
    const response = await fetch(window.Shopify.routes.root + "cart/add.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const json = await response.json();

    console.log("addToCart response ", json);
  } catch (error) {
    console.log("Add-To-Cart Error ", error);
  }
}

let comboOneButton = document.getElementById("_xl-bsc-btn-1");
let lStatus = true;

comboOneButton.addEventListener("click", async () => {
  let formData = {
    items: [
      {
        id: 45660808839360,
        quantity: 1,
      },
      {
        id: 45660800647360,
        quantity: 1,
      },
    ],
  };

  loadingState(true, comboOneButton);

  await clearCart();
  await addToCart(formData);
  openCartDrawer();
  loadingState(false, comboOneButton);
});

let comboTwoButton = document.getElementById("_xl-bsc-btn-2");

comboTwoButton.addEventListener("click", async () => {
  let formData = {
    items: [
      {
        id: 45667138076864,
        quantity: 1,
      },
      {
        id: 45641582510272,
        quantity: 1,
      },
    ],
  };

  loadingState(true, comboTwoButton);

  await clearCart();
  await addToCart(formData);
  openCartDrawer();
  loadingState(false, comboTwoButton);
});
