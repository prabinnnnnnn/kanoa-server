document.addEventListener('DOMContentLoaded', function() {
  // Function to update modal with review data
  function updateReviewModal(reviewData) {
    document.getElementById('updateReviewId').value = reviewData.id;
    document.getElementById('updateServiceId').value = reviewData.serviceId;
    document.getElementById('updateAuthor').value = reviewData.author;
    document.getElementById('updateTitle').value = reviewData.title;
    document.getElementById('updateRate').value = reviewData.rate;
    document.getElementById('updateMessage').value = reviewData.message;

    // Handle image preview
    const imagePreview = document.querySelector('#currentImagePreview img');
    if (reviewData.imagePath) {
      imagePreview.src = '/' + reviewData.imagePath;
      imagePreview.style.display = 'block';
    } else {
      imagePreview.style.display = 'none';
    }
  }

  // Add click handlers to edit buttons
  document.querySelectorAll('.edit-item-btn').forEach(button => {
    button.addEventListener('click', function() {
      const reviewData = {
        id: this.dataset.id,
        serviceId: this.dataset.serviceId,
        author: this.dataset.author,
        title: this.dataset.title,
        rate: this.dataset.rate,
        message: this.dataset.message,
        imagePath: this.dataset.imagePath
      };
      updateReviewModal(reviewData);
    });
  });
});
