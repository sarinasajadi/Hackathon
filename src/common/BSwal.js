import swal from 'sweetalert2';

const onOpen = (popup) => {
  popup.getElementsByClassName('swal2-confirm')[0].setAttribute('id', 'SwalBtnConfirm');
  popup.getElementsByClassName('swal2-cancel')[0].setAttribute('id', 'SwalBtnCancel');
};
export const BSwalConfirmationDelete = () =>
  new Promise((resolve) => {
    swal
      .fire({
        title: 'Are you sure you want to delete this item?',
        text: 'The deletion operation is irreversible',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        onOpen,
      })
      .then((result) => resolve(result));
  });

export const BSwalConfirmation = (title, text) =>
  new Promise((resolve) => {
    swal
      .fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        onOpen,
      })
      .then((result) => resolve(result));
  });

export const BSwalDeleted = () =>
  new Promise((resolve) => {
    swal
      .fire({
        title: 'Announcement',
        text: 'Removal operation completed successfully',
        icon: 'success',
        confirmButtonText: 'Confirm',
        onOpen,
      })
      .then((result) => resolve(result));
  });

export const BSwalCustom = (title, text = null, icon = 'success') =>
  new Promise((resolve) => {
    swal
      .fire({
        title,
        text,
        icon,
        confirmButtonText: 'Confirm',
        onOpen,
      })
      .then((result) => resolve(result));
  });

export const BSwal = (props) =>
  new Promise((resolve) => {
    swal.fire({ ...props }).then((result) => resolve(result));
  });

export const BSwalShowError = async (messages) => {
  let _messages = '';
  if (messages)
    messages.forEach((c) => {
      _messages += `<br/>${typeof c === 'string' ? c : c.message}`;
    });

  return new Promise((resolve) => {
    setTimeout(() => {
      const result = swal.fire({
        title: 'Error',
        html: _messages,
        icon: 'error',
        confirmButtonText: 'Confirm',
        onOpen,
      });
      return resolve(result);
    }, 1);
  });
};
