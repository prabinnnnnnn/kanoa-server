Quill.register("modules/imageUploader", ImageUploader);

document.addEventListener("DOMContentLoaded", function () {    
    var editor = new Quill("#snow-editor", {
        theme: "snow",
        modules: {
            toolbar: [
                [{
                    'font': []
                }, {
                    'header': [false, 1, 2, 3, 4, 5, 6]
                }],
                ['bold', 'italic', 'underline', 'strike'],
                [{
                    'color': []
                }, {
                    'background': []
                }],
                [{
                    'script': 'super'
                }, {
                    'script': 'sub'
                }],
                [{
                    'size': []
                },
                    'blockquote', 'code-block'],
                [{
                    'list': 'ordered'
                }, {
                    'list': 'bullet'
                }, {
                    'indent': '-1'
                }, {
                    'indent': '+1'
                }],
                ['direction', {
                    'align': []
                }],
                ['link', 'image', 'video'],
                ['clean']
            ],
            imageResize: {
                displaySize: true,
                modules: ['Resize', 'DisplaySize']
            },
            imageUploader: {
                upload: (file) => {
                    return new Promise((resolve, reject) => {
                        const formData = new FormData();
                        formData.append("image", file);

                        fetch("/upload/image", {
                            method: "POST",
                            body: formData
                        })
                            .then((response) => response.json())
                            .then((result) => {
                                resolve(result.url);
                            })
                            .catch((error) => {
                                reject("Upload failed");
                                console.error("Error:", error);
                            });
                    });
                }
            }
        }
    });

});