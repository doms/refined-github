import './limit-commit-title-length.css';
import select from 'select-dom';
import features from '../libs/features';
import onPrMergePanelOpen from '../libs/on-pr-merge-panel-open';

function init(): void {
	const inputField = select<HTMLInputElement>([
		'#commit-summary-input', // Commit title on edit file page
		'#merge_title_field' // PR merge message field
	].join(','));

	// The input field doesn't exist on PR merge page if you don't have access to that repo
	if (!inputField) {
		return;
	}

	inputField.addEventListener('input', () => {
		inputField.setCustomValidity(inputField.value.length > 72 ? `The title should be maximum 72 characters, but is ${inputField.value.length}` : '');
	});

	// For PR merges, GitHub restores any saved commit messages on page load
	// Triggering input event for these fields immediately validates the form
	onPrMergePanelOpen(() => {
		inputField.dispatchEvent(new Event('input'));
	});
}

features.add({
	id: 'limit-commit-title-length',
	description: 'Limits the length of commit fields to 72 characters',
	init,
	load: features.onAjaxedPages,
	include: [
		features.isPRConversation,
		features.isEditingFile
	]
});
