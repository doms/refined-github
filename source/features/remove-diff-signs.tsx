import './remove-diff-signs.css';
import features from '../libs/features';

function init(): void {
	document.body.classList.add('rgh-remove-diff-signs');
}

features.add({
	id: __featureName__,
	description: 'Hide diff signs (+-)',
	init
});
