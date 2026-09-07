function previewImage(event) {
    const imagePreview = document.getElementById('imagePreview');
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        imagePreview.src = e.target.result;
        imagePreview.classList.remove('d-none');
    }
    reader.readAsDataURL(file);
}

function addFAQ() {
    const faqFields = document.getElementById('faqFields');
    const faqCount = faqFields.children.length;
    const faqTemplate = `
    <div class="mb-3 faq-item">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">FAQ ${faqCount + 1}</h5>
                <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.faq-item').remove()">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
            <div class="card-body">
                <div class="row gy-4">
                    <div class="col-md-12">
                        <label for="faqQuestion" class="form-label">Question</label>
                        <input type="text" class="form-control" name="faqs[${faqCount}][question]" required>
                    </div>
                    <div class="col-md-12">
                        <label for="faqAnswer" class="form-label">Answer</label>
                        <textarea class="form-control" name="faqs[${faqCount}][answer]" required></textarea>
                    </div>
                    <div class="col-md-12">
                        <label for="faqSortOrder" class="form-label">Sort Order</label>
                        <input type="number" class="form-control" name="faqs[${faqCount}][sortOrder]" value="${faqCount + 1}">
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    faqFields.insertAdjacentHTML('beforeend', faqTemplate);
}

function addDevelopmentPortfolioContent() {
    const contentFields = document.getElementById('contentFields');
    const contents = contentFields.children.length;

    const contentTemplate = `
    <div class="mb-3 content-item">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Content ${contents + 1}</h5>
                <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.content-item').remove()">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
            <div class="card-body">
                <div class="row gy-4">
                    <div class="col-md-12">
                        <label for="faqQuestion" class="form-label">Title</label>
                        <input type="text" class="form-control" name="contents[${contents}][title]" required>
                    </div>
                    <div class="col-12">
                        <label for="description" class="form-label">Description</label>
                        <textarea name="contents[${contents}][description]" id="description" class="form-control" rows="5"></textarea>
                    </div>
                    <div class="col-12">
                        <label for="coverImage" class="form-label">Image</label>
                        <input type="file" class="form-control" id="coverImage" name="contentImages" data-index="${contents}" accept="image/*" required>
                        <img id="imagePreview" src="#" alt="Image Preview" class="d-none mt-2 w-25 img-fluid" />
                    </div>
                    <div class="col-md-12">
                        <label for="faqSortOrder" class="form-label">Sort Order</label>
                        <input type="number" class="form-control" name="contents[${contents}][sortOrder]" value="${contents + 1}">
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    contentFields.insertAdjacentHTML('beforeend', contentTemplate);
}

document.getElementById('title').addEventListener('input', function () {
    let title = this.value;
    let slug = title.toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
    document.getElementById('slug').value = slug;
});

document.getElementById('updateTitle').addEventListener('input', function () {
    let title = this.value;
    let slug = title.toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
    document.getElementById('updateSlug').value = slug;
});