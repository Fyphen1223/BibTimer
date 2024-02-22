window.onload = function () {
	const spinner = document.getElementById('loading');
	spinner.classList.add('loaded');
	const verb = document.getElementById('verb');
	if (!verb) return;
	const verbs = ['再構築す', '変え', '盛り上げ', '楽しめるようにす', '知らしめ'];
	let index = 0;
	let isAdding = false;
	let originalText = verbs[index];

	function decreaseText() {
		if (verb.innerHTML.length > 0) {
			verb.innerHTML = verb.innerHTML.slice(0, -1);
			setTimeout(decreaseText, 100);
		} else {
			isAdding = true;
			index = (index + 1) % verbs.length;
			originalText = verbs[index];
			increaseText();
		}
	}
	function increaseText() {
		if (verb.innerHTML.length < originalText.length) {
			verb.innerHTML += originalText[verb.innerHTML.length];
			setTimeout(increaseText, 100);
		} else {
			isAdding = false;
			setTimeout(decreaseText, 4000);
		}
	}
	decreaseText();
};

let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

let follower = null;

const lerp = (start, end, t) => {
	return start * (1 - t) + end * t;
};

const animate = () => {
	mouseX = lerp(mouseX, targetX, 0.5);
	mouseY = lerp(mouseY, targetY, 0.5);

	if (follower) {
		follower.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
	}

	requestAnimationFrame(animate);
};

let isInitialMove = true;
document.addEventListener('mousemove', (e) => {
	targetX = e.clientX;
	targetY = e.clientY;
	if (follower) {
		follower.style.display = 'block';
		if (isInitialMove) {
			mouseX = targetX;
			mouseY = targetY;
			isInitialMove = false;
		}
	}
});

document.addEventListener('DOMContentLoaded', (e) => {
	follower = document.getElementById('cursorFollower');
	animate();
});
