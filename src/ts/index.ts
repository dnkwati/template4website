// export * from './core/greeter.js';
import greeter from './core/greeter.js';
// old school JS
(function (root) {
	const node = document.createElement('div');
	node.textContent = greeter('Jane Doe');
	document.body.appendChild(node);
})(this);
