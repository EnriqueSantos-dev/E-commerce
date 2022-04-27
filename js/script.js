let cart = document.querySelector('.box-cart-i'),
	contentCart = document.querySelector('.content-cart'),
	cartItens = document.querySelector('.cart-itens'),
	openModal = document.querySelector('.large-img img'),
	windowModal = document.querySelector('.container-modal'),
	closeModal = document.querySelector('.close-modal'),
	newProduct = document.querySelector('.sneaker .next'),
	prevProduct = document.querySelector('.sneaker .prev'),
	menu = document.querySelector('.menu'),
	menuActive = document.querySelectorAll('.menu nav ul li a'),
	modal = document.querySelector('.modal');

// variáveis para montar e manipular a parte principal do site
let containerSneakers = document.querySelector('.container-sneakers'),
	infoSneakers = document.querySelector('.informations-sneaker'),
	priceInfo = document.querySelector('.price-information-sneaker'),
	arraySmallImgNoModal = document.querySelectorAll('.small-sneakers .img-small');

function construtorSneakers(listTypeProduct, indexProduct) {
	containerSneakers
		.querySelector('.large-img')
		.setAttribute('id', listTypeProduct[indexProduct].id);
	containerSneakers.querySelector('.large-img img').src = listTypeProduct[indexProduct].urls[0];
	let arraySmallImgNoModal = document.querySelectorAll('.small-sneakers .img-small');
	arraySmallImgNoModal.forEach((item, index) => {
		item.querySelector('img').src = listTypeProduct[indexProduct].urls[index];
	});
	infoSneakers.querySelector('.title-name-sneaker h4').innerHTML =
		listTypeProduct[indexProduct].name;
	infoSneakers.querySelector('.aviso h2').innerHTML = listTypeProduct[indexProduct].waming;
	infoSneakers.querySelector('.descri p').innerHTML = listTypeProduct[indexProduct].descri;
	priceInfo.querySelector('#price-actual').innerHTML = `R$ ${listTypeProduct[
		indexProduct
	].price.toFixed(2)}`;
}

window.addEventListener('load', construtorSneakers(listSneakers[0].colletion, 0));

// change photo onclick small photo
arraySmallImgNoModal.forEach(item => {
	item.addEventListener('click', () => {
		document.querySelector('.small-sneakers .img-small.active').classList.remove('active');
		item.classList.add('active');
		let nextImg = item.querySelector('img').getAttribute('src');
		containerSneakers.querySelector('.large-img img').src = nextImg;
	});
});

function typeProductShow() {
	let typeProduct = document.querySelector('.menu li.active a').getAttribute('data-type');
	switch (typeProduct) {
		case '0':
			return listSneakers[0].colletion;
		case '1':
			return listSneakers[1].man;
		case '2':
			return listSneakers[2].women;
		default:
			return listSneakers[0].colletion;
	}
}

let currentIndexProduct = 0;

function nextProduct() {
	let list = typeProductShow();
	if (currentIndexProduct == list.length - 1) {
		currentIndexProduct = 0;
		construtorSneakers(list, 0);
	} else {
		currentIndexProduct++;
		construtorSneakers(list, currentIndexProduct);
	}
}
function beforeProduct() {
	let list = typeProductShow();
	if (currentIndexProduct == 0) {
		currentIndexProduct = list.length - 1;
		construtorSneakers(list, currentIndexProduct);
	} else {
		currentIndexProduct--;
		construtorSneakers(list, currentIndexProduct);
	}
}
newProduct.addEventListener('click', nextProduct);
prevProduct.addEventListener('click', beforeProduct);

menuActive.forEach(item => {
	item.addEventListener('click', () => {
		// voltar a selação da img pequena para o início
		document.querySelector('.small-sneakers .img-small.active').classList.remove('active');
		document.querySelectorAll('.small-sneakers .img-small')[0].classList.add('active');

		document.querySelector('.menu nav ul li.active').classList.remove('active');
		item.parentElement.classList.add('active');
		currentIndexProduct = 0;
		let restartValNewSection = typeProductShow();
		construtorSneakers(restartValNewSection, currentIndexProduct);
	});
});

// variaveis para o modal
let arrayImgSmallModal = document.querySelectorAll('.small-modal .img-small'),
	nextProductModal = modal.querySelector('#next-modal'),
	prevProductModal = modal.querySelector('#prev-modal'),
	currentImgModal = modal.querySelector('.img-big-modal img'),
	listActualTypeProductModal = typeProductShow(),
	listImgsSmall = modal.querySelectorAll('.img-small img ');

function openModalFunction() {
	let idImgCurrent = containerSneakers.querySelector('.large-img').getAttribute('id');
	let typeProductCurrent = typeProductShow();
	let filterItem = typeProductCurrent.filter(item => {
		return item.id == idImgCurrent;
	});
	modal.querySelector('.img-big-modal img').src = filterItem[0].imgPrinci;
	modal.querySelector('.img-big-modal').setAttribute('id', idImgCurrent);
	modal.querySelectorAll('.img-small img').forEach((item, index) => {
		index == 0 ? item.parentElement.classList.add('active') : null;
		item.src = filterItem[0].urls[index];
	});
	windowModal.classList.add('active');
}
openModal.addEventListener('click', openModalFunction);

closeModal.addEventListener('click', () => {
	windowModal.classList.remove('active');
});

// modal img change
arrayImgSmallModal.forEach(item => {
	item.addEventListener('click', () => {
		modal.querySelector('.img-small.active').classList.remove('active');
		item.classList.add('active');
		let nextImg = item.querySelector('img').getAttribute('src');
		modal.querySelector('.img-big-modal img').src = nextImg;
	});
});

let currentIndexImgModal = 0;
nextProductModal.addEventListener('click', () => {
	document.querySelector('.modal .img-small.active').classList.remove('active');
	if (currentIndexImgModal == listActualTypeProductModal[0].urls.length - 1) {
		currentIndexImgModal = 0;
		currentImgModal.src = listImgsSmall[0].getAttribute('src');
	} else {
		currentIndexImgModal++;
		currentImgModal.src = listImgsSmall[currentIndexImgModal].getAttribute('src');
	}
	document.querySelectorAll('.modal .img-small')[currentIndexImgModal].classList.add('active');
});

prevProductModal.addEventListener('click', () => {
	document.querySelector('.modal .img-small.active').classList.remove('active');
	if (currentIndexImgModal == 0) {
		currentIndexImgModal = listActualTypeProductModal[0].urls.length - 1;
		currentImgModal.src = listImgsSmall[currentIndexImgModal].getAttribute('src');
	} else {
		currentIndexImgModal--;
		currentImgModal.src = listImgsSmall[currentIndexImgModal].getAttribute('src');
	}
	document.querySelectorAll('.modal .img-small')[currentIndexImgModal].classList.add('active');
});

let currentValorSneakerQuanti = 1;
const decrementQuantiSneaker = document.getElementById('less'),
	incrementQuantiSneaker = document.getElementById('plus');

decrementQuantiSneaker.addEventListener('click', () => {
	if (currentValorSneakerQuanti > 1) {
		currentValorSneakerQuanti--;
		document.querySelector('.quanti-add-cart').innerHTML = currentValorSneakerQuanti;
	} else {
		return;
	}
});
incrementQuantiSneaker.addEventListener('click', () => {
	currentValorSneakerQuanti++;
	document.querySelector('.quanti-add-cart').innerHTML = currentValorSneakerQuanti;
});

// cart

let cartPro = [];
function updateCart(node) {
	let beforeCheckoutButton = document.querySelector('.checkout');
	if (cartPro.length > 0) {
		let itemEqual = cartPro.filter(item => {
			return item.getAttribute('id') == node.getAttribute('id');
		});
		if (itemEqual.length > 0) {
			itemEqual.map(item => {
				if (item.getAttribute('id') == node.getAttribute('id')) {
					item.querySelector('.subtotal span').innerHTML = `
						${(
							parseFloat(item.querySelector('.content-cart .subtotal span').textContent) +
							parseFloat(node.querySelector('.subtotal span').textContent)
						).toFixed(2)}
					`;
					item.querySelector('.content-cart #quantiSne').innerHTML = `
						${
							parseFloat(item.querySelector('.content-cart #quantiSne').textContent) +
							parseFloat(node.querySelector('#quantiSne').textContent)
						}
					`;
				}
			});
		} else {
			cartPro.push(node);
			// contentCart.append(node);
			contentCart.insertBefore(node, beforeCheckoutButton);
		}
	} else {
		cartPro.push(node);
		// contentCart.append(node);
		contentCart.insertBefore(node, beforeCheckoutButton);
	}
	cart.querySelector('.box-cart-i span').innerHTML = cartPro.length;
	cart.querySelector('.box-cart-i span').classList.add('active');
}
let addCart = document.querySelector('.insert-in-cart');

// qundo clicar em add
addCart.addEventListener('click', () => {
	let cloneCartContent = document.querySelector('.model-cart').cloneNode(true);
	let productMomentShow = containerSneakers.querySelector('.large-img').getAttribute('id');

	let quanti = parseFloat(document.querySelector('.quanti-add-cart').textContent);
	document.querySelector('.quanti-add-cart').innerHTML = '1';
	currentValorSneakerQuanti = 1;
	let infoProductShow = typeProductShow().filter(item => {
		return item.id == productMomentShow;
	});
	cloneCartContent.querySelector('.img-item img').src = infoProductShow[0].imgPrinci;
	cloneCartContent.querySelector('.name-item').innerHTML = infoProductShow[0].descri;
	cloneCartContent.querySelector(
		'.quanti #price-item'
	).innerHTML = `R$ ${infoProductShow[0].price} x `;

	cloneCartContent.querySelector('.quanti #quantiSne').innerHTML = `${quanti}`;

	cloneCartContent.querySelector('.subtotal span').innerHTML = `${(
		infoProductShow[0].price * quanti
	).toFixed(2)}`;

	cloneCartContent.setAttribute('id', productMomentShow);
	cloneCartContent.classList.add('active');
	updateCart(cloneCartContent);
	showCart();
});

function showCart() {
	cartItens.classList.toggle('active');
	if (contentCart.querySelectorAll('.content-cart .model-cart').length > 0) {
		document.querySelector('.content-cart .model-cart').classList.add('active');
		contentCart.classList.add('active');
		cartItens.querySelector('.cart-empty').classList.remove('active');
	} else {
		document.querySelector('.model-cart').classList.remove('active');
		contentCart.classList.remove('active');
		cartItens.querySelector('.cart-empty').classList.add('active');
	}
}
cart.addEventListener('click', showCart);

function clicou(e) {
	let parent = e.target.parentElement;
	let parentParent = parent.parentElement;
	console.log(parentParent);
}

let checkout = document.querySelector('.checkout');
checkout.addEventListener('click', () => {
	console.log(cartPro);
});

// menu toggle
let btnMobile = document.querySelector('.btn-mobile'),
	closeMenu = document.querySelector('.menu .close-menu');

btnMobile.addEventListener('click', () => {
	menu.classList.toggle('active');
	closeMenu.classList.toggle('active');
});
closeMenu.addEventListener('click', () => {
	menu.classList.remove('active');
	closeMenu.classList.remove('active');
});
