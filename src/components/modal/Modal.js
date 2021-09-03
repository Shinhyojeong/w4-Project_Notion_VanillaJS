import { on, emit } from '../../utils/emitter.js';

import ModalHeader from './ModalHeader.js';
import ModalBody from './ModalBody.js';

export default function Modal({ $target }) {
	const $modal = $createElement('div');
	const $modalHeader = $createElement('div', '.modal-header');
	const $modalBody = $createElement('div', '.modal-body');
	addClassAll($modal, 'modal-container', 'hide');

	this.state = {
		id: 'new',
		title: '제목없음',
		content: '문서의 내용을 입력하세요!',
	};

	this.setState = nextState => {
		this.state = nextState;
	};

	const showModal = () => {
		$modal.classList.remove('hide');
	};
	const hideModal = () => {
		$modal.classList.add('hide');
	};

	new ModalHeader({
		$target: $modalHeader,
		onClick: {
			openPage: () => {
				const { id } = this.state;

				emit.readDocument(`/posts/${id}`);
				hideModal();
			},
			closeModal: () => {
				hideModal();
			},
		},
	});

	const LIMIT_TIME = 200;
	let modalBodyUpdateTimer = null;

	new ModalBody({
		$target: $modalBody,
		onUpdate: {
			updateTitle: nextDocument => {
				const { id } = this.state;

				const currentLi = $(`li[data-id="${id}"] span`);
				currentLi.textContent = nextDocument.title;
				$('.show-modal-title').dataset.text = nextDocument.title;

				if (modalBodyUpdateTimer) {
					clearTimeout(modalBodyUpdateTimer);
				}
				modalBodyUpdateTimer = setTimeout(() => {
					emit.updateDocument(id, nextDocument);
				}, LIMIT_TIME);
			},
			updateContent: nextDocument => {
				const { id } = this.state;
				$('.show-modal-content').dataset.text = nextDocument.content;

				if (modalBodyUpdateTimer) {
					clearTimeout(modalBodyUpdateTimer);
				}
				modalBodyUpdateTimer = setTimeout(() => {
					emit.updateDocument(id, nextDocument);
				}, LIMIT_TIME);
			},
		},
	});

	on.showModal(showModal);
	on.updateModal(nextState => {
		this.setState(nextState);
	});

	window.addEventListener('click', e => {
		const createBtn = e.target.dataset?.target === 'modal';
		const onModal = e.target.className.includes('modal');

		if (createBtn || onModal) {
			return;
		}
		const noData =
			!$('.show-modal-title').dataset.text &&
			!$('.show-modal-content').dataset.text;
		const isHide = $modal.classList.contains('hide');
		const isEmpty = !onModal && !isHide && noData;

		if (isEmpty) {
			emit.deleteEmptyDocument(this.state.id);
		}
		hideModal();
	});

	$target.appendChild($modal);
	$modal.appendChild($modalHeader);
	$modal.appendChild($modalBody);
}
