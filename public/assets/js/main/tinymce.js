
tinymce.init({
    selector: 'textarea#content',
    license_key: 'gpl',
    skin_url: '/tinymce/skins/ui/oxide',
    content_css: 'dark',
    plugins: [
        'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists',
        'media', 'searchreplace', 'table', 'visualblocks', 'wordcount', 'advcode', 'editimage'
    ],
    toolbar: 'undo redo | blocks | bold italic underline | link image media table | alignleft aligncenter alignright | numlist bullist | code',
    content_css: '/tinymce/skins/content/default/content.css',
    automatic_uploads: false,
    images_upload_url: '/upload/image',
    images_upload_credentials: true,
    file_picker_types: 'image',
    relative_urls: false,
    // paste_as_text: true,
    // remove_script_host: false,

    file_picker_callback: function (cb, value, meta) {
        if (meta.filetype === 'image') {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');

            input.onchange = function () {
                const file = this.files[0];
                const formData = new FormData();
                formData.append('tiny', file);

                fetch('/upload-tiny-image', {
                    method: 'POST',
                    body: formData
                })
                    .then(res => {
                        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                        return res.json();
                    })
                    .then(data => {
                        console.log('Upload response:', data); // Debug response
                        cb(data.location, { title: file.name });
                    })
                    .catch(err => {
                        console.error('Upload failed:', err);
                    });
            };

            input.click();
        }
    }
});
