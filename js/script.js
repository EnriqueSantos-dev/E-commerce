let cart = document.querySelector('.box-cart-i i'),
	contentCard = document.querySelector('.content-cart'),
	cartItens = document.querySelector('.cart-itens'),
	openModal = document.querySelector('.large-img'),
	windowModal = document.querySelector('.container-modal'),
	closeModal = document.querySelector('.close-modal'),
	newProduct = document.querySelector('.sneaker .next'),
	prevProduct = document.querySelector('.sneaker .prev'),
	menuActive = document.querySelectorAll('.menu nav ul li a');

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

cart.addEventListener('click', () => {
	cartItens.classList.toggle('active');
	// updateCart();
});

// change photo onclick small photo
arraySmallImgNoModal.forEach(item => {
	item.addEventListener('click', e => {
		let imgActual = document.querySelector('.sneaker .large-img').getAttribute('src');
		document.querySelector('.small-sneakers .img-small.active').classList.remove('active');
		item.classList.add('active');
		let nextImg = item.querySelector('img').getAttribute('src');
		containerSneakers.querySelector('.large-img img').src = nextImg;
	});
});

window.addEventListener('load', construtorSneakers(listSneakers[0].colletion, 0));

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
		document.querySelector('.menu nav ul li.active').classList.remove('active');
		item.parentElement.classList.add('active');
		currentIndexProduct = 0;
		let restartValNewSection = typeProductShow();
		console.log(restartValNewSection);
		construtorSneakers(restartValNewSection, currentIndexProduct);
	});
});

openModal.addEventListener('click', e => {
	let idImgCurrent = containerSneakers.querySelector('.large-img').getAttribute('id');
	let typeProductCurrent = typeProductShow();
	windowModal.classList.add('active');
});

closeModal.addEventListener('click', () => {
	windowModal.classList.remove('active');
});

function updateCart() {}
