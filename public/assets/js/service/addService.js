function addGoals() {
    const goalFields = document.getElementById('goalFields');
    const goalCount = goalFields.children.length;
    const goalTemplate = `
    <div class="mb-3 goal-item">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Goal ${goalCount + 1}</h5>
                <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.goal-item').remove()">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
            <div class="card-body">
                <div class="row gy-4">
                    <div class="col-md-12">
                        <label for="goalQuestion" class="form-label">Title</label>
                        <input type="text" class="form-control" name="goals[${goalCount}][title]" required>
                    </div>
                    <div class="col-md-12">
                        <label for="goalAnswer" class="form-label">Description</label>
                        <textarea class="form-control" name="goals[${goalCount}][description]" required></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="goalQuestion" class="form-label">Icon class</label>
                        <input type="text" class="form-control" name="goals[${goalCount}][icon]" placeholder="luice icon class are required">
                    </div>
                    <div class="col-md-12">
                        <label for="goalSortOrder" class="form-label">Sort Order</label>
                        <input type="number" class="form-control" name="goals[${goalCount}][sortOrder]" value="${goalCount + 1}">
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    goalFields.insertAdjacentHTML('beforeend', goalTemplate);
}

function removeGoalItem(itemId) {
    document.getElementById(itemId).remove();
}

function addNewGoalItem() {
    const newIndex = document.querySelectorAll('.goal-item').length;
    const template = `
        <div class="accordion-item goal-item mb-2" id="goal-item-new-${newIndex}">
            <h2 class="accordion-header p-6" id="heading-new-${newIndex}">
                <button class="accordion-button p-6" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#collapse-new-${newIndex}" aria-expanded="true">
                    New Goal
                </button>
            </h2>
            <div id="collapse-new-${newIndex}" class="accordion-collapse collapse show" 
                 data-bs-parent="#goalAccordion">
                <div class="accordion-body">
                    <div class="mb-3">
                        <label class="form-label">Title</label>
                        <input type="text" class="form-control faq-question" 
                               name="goals[${newIndex}][title]" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Description</label>
                        <textarea class="form-control faq-answer" 
                                  name="goals[${newIndex}][description]" rows="3" required></textarea>
                    </div>
                                        <div class="mb-3">
                        <label for="goalQuestion" class="form-label">Icon class</label>
                        <input type="text" class="form-control" name="goals[${newIndex}][icon]" placeholder="luice icon class are required">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Sort Order</label>
                        <input type="number" class="form-control faq-sort" 
                               name="goals[${newIndex}][sortOrder]" value="${newIndex + 1}" required>
                    </div>
                    <div class="text-end">
                        <button type="button" class="btn btn-danger btn-sm" 
                                onclick="removeGoalItem('goal-item-new-${newIndex}')">Remove goal</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('newGoalContainer').insertAdjacentHTML('beforeend', template);
}

function addProcess() {
    const processFields = document.getElementById('processFields');
    const processCount = processFields.children.length;
    const processTemplate = `
    <div class="mb-3 goal-item">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Process ${processCount + 1}</h5>
                <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.goal-item').remove()">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
            <div class="card-body">
                <div class="row gy-4">
                    <div class="col-md-12">
                        <label for="goalQuestion" class="form-label">Title</label>
                        <input type="text" class="form-control" name="process[${processCount}][title]" required>
                    </div>
                    <div class="col-md-12">
                    <label for="goalAnswer" class="form-label">Description</label>
                    <textarea class="form-control" name="process[${processCount}][description]" required></textarea>
                    </div>
                    <div class="col-md-12">
                        <label for="goalQuestion" class="form-label">Icon class</label>
                        <input type="text" class="form-control" name="process[${processCount}][icon]" placeholder="luice icon class are required">
                    </div>
                    <div class="col-md-12">
                        <label for="goalSortOrder" class="form-label">Sort Order</label>
                        <input type="number" class="form-control" name="process[${processCount}][sortOrder]" value="${processCount + 1}">
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    processFields.insertAdjacentHTML('beforeend', processTemplate);
}


function removeProcessItem(itemId) {
    document.getElementById(itemId).remove();
}

function addNewProcessItem() {
    const newIndex = document.querySelectorAll('.process-item').length;
    const template = `
        <div class="accordion-item process-item mb-2" id="process-item-new-${newIndex}">
            <h2 class="accordion-header p-6" id="heading-new-${newIndex}">
                <button class="accordion-button p-6" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#collapse-new-${newIndex}" aria-expanded="true">
                    New Goal
                </button>
            </h2>
            <div id="collapse-new-${newIndex}" class="accordion-collapse collapse show" 
                 data-bs-parent="#processAccordion">
                <div class="accordion-body">
                    <div class="mb-3">
                        <label class="form-label">Title</label>
                        <input type="text" class="form-control faq-question" 
                               name="process[${newIndex}][title]" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Description</label>
                        <textarea class="form-control faq-answer" 
                                  name="process[${newIndex}][description]" rows="3" required></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="goalQuestion" class="form-label">Icon class</label>
                        <input type="text" class="form-control" name="process[${newIndex}][icon]" placeholder="luice icon class are required">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Sort Order</label>
                        <input type="number" class="form-control faq-sort" 
                               name="process[${newIndex}][sortOrder]" value="${newIndex + 1}" required>
                    </div>
                    <div class="text-end">
                        <button type="button" class="btn btn-danger btn-sm" 
                                onclick="removeProcessItem('process-item-new-${newIndex}')">Remove process</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('newProcessContainer').insertAdjacentHTML('beforeend', template);
}


// Feature Sections

function addFeature() {
    const featureFields = document.getElementById('featureFields');
    const featureCount = featureFields.children.length;
    const featureTemplate = `
    <div class="mb-3 feature-item">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Feature ${featureCount + 1}</h5>
                <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.feature-item').remove()">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
            <div class="card-body">
                <div class="row gy-4">
                    <div class="col-md-12">
                        <label for="goalQuestion" class="form-label">Title</label>
                        <input type="text" class="form-control" name="features[${featureCount}][title]" required>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    featureFields.insertAdjacentHTML('beforeend', featureTemplate);
}


function removeFeatureItem(itemId) {
    document.getElementById(itemId).remove();
}

function addNewFeatureItem() {
    // Count how many feature items already exist
    const existingFeatures = document.querySelectorAll('.feature-item');
    const newIndex = existingFeatures.length;

    const template = `
        <div class="accordion-item process-item mb-2 feature-item" id="feature-item-new-${newIndex}">
            <h2 class="accordion-header p-6" id="heading-new-${newIndex}">
                <button class="accordion-button p-6" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#collapse-new-${newIndex}" aria-expanded="true">
                    New Feature
                </button>
            </h2>
            <div id="collapse-new-${newIndex}" class="accordion-collapse collapse show" 
                 data-bs-parent="#processAccordion">
                <div class="accordion-body">
                    <div class="mb-3">
                        <label class="form-label">Title</label>
                        <input type="text" class="form-control faq-question" 
                               name="features[${newIndex}][title]" required>
                    </div>
                    <div class="text-end">
                        <button type="button" class="btn btn-danger btn-sm" 
                                onclick="removeFeatureItem('feature-item-new-${newIndex}')">Remove Feature</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('newFeatureContainer').insertAdjacentHTML('beforeend', template);
}