
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    


Ext.define('Common_Pop_FileUpload', {
	extend: 'Ext.form.Panel',
	renderTo: 'fi-form',
    width: 500,
    frame: true,
        title: 'File Upload Form',
        bodyPadding: '10 10 0',
	/*
    
    height: 430,
    width: 360,
    modal: true,
    title: '계정코드 추가',
	*/
    defaults: {
            anchor: '100%',
            allowBlank: false,
            msgTarget: 'side',
            labelWidth: 50
        },

        items: [{
            xtype: 'textfield',
            fieldLabel: 'Name'
        },{
            xtype: 'filefield',
            id: 'form-file',
            emptyText: 'Select an image',
            fieldLabel: 'Photo',
            name: 'photo-path',
            buttonText: '',
            buttonConfig: {
                iconCls: 'upload-icon'
            }
        }],

        buttons: [{
            text: 'Save',
            handler: function(){
                var form = this.up('form').getForm();
                if(form.isValid()){
                    form.submit({
                        url: 'file-upload.php',
                        waitMsg: 'Uploading your photo...',
                        success: function(fp, o) {
                            msg('Success', 'Processed file "' + o.result.file + '" on the server');
                        }
                    });
                }
            }
        },{
            text: 'Reset',
            handler: function() {
                this.up('form').getForm().reset();
            }
        }]

});
