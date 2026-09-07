function removeFeature(itemId) {
    document.getElementById(itemId).remove();
}

function addFeature() {
    const featureFields = document.getElementById('featureFields');
    const featureCount = document.querySelectorAll('.feature-item').length;
    const featureTemplate = `
    <div class="mb-3 feature-item" id="feature-item-${featureCount}">
        <div class="card border">
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-12 mb-3">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="featureTitle${featureCount}" name="features[${featureCount}][title]" placeholder="Enter title" required>
                            <label for="featureTitle${featureCount}">Title</label>
                        </div>
                    </div>
                    <div class="col-12 mb-3">
                        <div class="form-floating">
                            <textarea rows="3" type="text" class="form-control" id="featureDescription${featureCount}" name="features[${featureCount}][description]" placeholder="Enter value" required></textarea>
                            <label for="featureDescription${featureCount}">Description</label>
                        </div>
                    </div>
                    <div class="col-12 mb-3">
                        <div class="">
                        <label for="featureIconClass${featureCount}">Benefits Keys</label>
                            <input type="text" class="form-control" id="featureIconClass${featureCount}" name="features[${featureCount}][keys]" placeholder="Seprate Keys with comma(,)" required>
                        </div>
                    </div>
                    <div class="col-12 mb-3">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="featureIconClass${featureCount}" name="features[${featureCount}][iconClass]" placeholder="Enter value" value="ArrowUpRight" required>
                            <label for="featureIconClass${featureCount}">IconClass</label>
                        </div>
                    </div>

                    <div class="col-12 mb-3">
                        <div class="form-floating">
                            <input  type="number" class="form-control" id="featureSortOrder${featureCount}" name="features[${featureCount}][sortOrder]" value="${featureCount + 1}" required>
                            <label for="featureSortOrder${featureCount}">Sort Order</label>
                        </div>
                    </div>
                    <div class="col-md-1 col-2 flex-end">
                        <button type="button" class="btn btn-outline-danger" 
                        onclick="removeFeature('feature-item-${featureCount}')">
                            <i class="ri-delete-bin-line"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    featureFields.insertAdjacentHTML('beforeend', featureTemplate);
}

