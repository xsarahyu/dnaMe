// Profile
document.getElementById('uploadButton').addEventListener('click', function() {
  document.getElementById('fileInput').click();
});

// Edit profile
const editProfileForm = document.getElementById('editProfileForm');
editProfileForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(editProfileForm);

  try {
    const response = await fetch('/edit-profile', {
      method: 'PUT',
      body: formData,
    });

    if (response.ok) {
      window.location.href = '/profile';
    } else {
      console.error('Error updating profile:', response.statusText);
    }
  } catch (error) {
    console.error('Error updating profile:', error.message);
  }
});

// Delete profile
const deleteProfileButton = document.getElementById('deleteProfileButton');
deleteProfileButton.addEventListener('click', async () => {
  if (confirm('Are you sure you want to delete your profile?')) {
    try {
      const response = await fetch('/edit-profile', {
        method: 'DELETE',
      });

      if (response.ok) {
        window.location.href = '/logout';
      } else {
        console.error('Error deleting profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting profile:', error.message);
    }
  }
});