const accordion = () => {
  const accordionList = document.querySelector('.accordion');
  const accordionListItem = document.querySelectorAll('.accordion-item');

  accordionListItem.forEach((elem) => {
    if (elem.children[0].classList.contains('msg-active')) {
      elem.children[1].style.height = `${elem.children[1].scrollHeight}px`;
    }
  });

  const open = (button, dropDown) => {
    closeAllDrops(button, dropDown);
    dropDown.style.height = `${dropDown.scrollHeight}px`;
    button.classList.add('msg-active');
    dropDown.classList.add('active');
  };

  const close = (button, dropDown) => {
    button.classList.remove('msg-active');
    dropDown.classList.remove('active');
    dropDown.style.height = '';
  };

  const closeAllDrops = (button, dropDown) => {
    accordionListItem.forEach((elem) => {
      if (elem.children[0] !== button && elem.children[1] !== dropDown)
        close(elem.children[0], elem.children[1]);
    });
  };

  accordionList.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('title_block')) {
      const parent = target.closest('.accordion-item');
      const content = parent.querySelector('.msg');
      content.classList.contains('active')
        ? close(target, content)
        : open(target, content);
    }
  });


};

export default accordion;