function removeBenefit(itemId) {
    document.getElementById(itemId)?.remove();
}

function addBenefits() {
    const benefitFields = document.getElementById('benefitFields');
    const benefitCount = document.querySelectorAll('.benefit-item').length;

    const benefitTemplate = `
    <div class="mb-3 benefit-item" id="benefit-item-${benefitCount}">
        <div class="card border">
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-12 mb-3">
                        <div class="form-floating">
                        
                            <input type="text" class="form-control" id="benefitMainTitle-${benefitCount}" 
                                name="benefits[${benefitCount}][title]" placeholder="Enter title" required>
                            <label for="benefitMainTitle-${benefitCount}">Title</label>
                        </div>
                    </div>
                    <div class="col-12 mb-3">
                        <div class="form-floating">
                            <textarea rows="3" class="form-control" id="benefitDescription-${benefitCount}" 
                                name="benefits[${benefitCount}][description]" placeholder="Enter description" required></textarea>
                            <label for="benefitDescription-${benefitCount}">Description</label>
                        </div>
                    </div>
                    <div class="col-12 mb-3">
                        <div id="benefitTitleFields-${benefitCount}"></div>
                        <div class="text-left mt-3 mb-3">
                            <button type="button" class="btn btn-soft-primary waves-effect" onclick="addBenefitTitle(${benefitCount})">
                                <i class="ri-add-line align-middle me-1"></i> Add Benefit Keys
                            </button>
                        </div>
                    </div>
                    <div class="col-md-1 col-2 flex-end">
                        <button type="button" class="btn btn-outline-danger" onclick="removeBenefit('benefit-item-${benefitCount}')">
                             <i class="ri-delete-bin-line"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    benefitFields.insertAdjacentHTML('beforeend', benefitTemplate);
}

function addBenefitTitle(benefitIndex) {
    const benefitFields = document.getElementById(`benefitTitleFields-${benefitIndex}`);
    const titleCount = document.querySelectorAll('.benefit-title-item').length;

    const benefitTemplate = `
    <div class="mb-3 benefit-title-item" id="benefit-title-item-${benefitIndex}-${titleCount}">
        <div class="card">
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-12 mb-3">
                        <div class="form-floating">
                            <input type="text" class="form-control" 
                                name="benefits[${benefitIndex}][benefitKeys][${titleCount}][title]" 
                                placeholder="Enter benefit key" required>
                            <label>Benefit Key</label>
                        </div>
                    </div>
                    <div class="col-md-1 col-2 flex-end">
                        <button type="button" class="btn btn-outline-danger" onclick="removeBenefit('benefit-title-item-${benefitIndex}-${titleCount}')">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    benefitFields.insertAdjacentHTML('beforeend', benefitTemplate);
}
