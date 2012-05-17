/*
 * File: app/view/MovieFormPanel.js
 *
 * This file was generated by Sencha Architect version 2.0.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.0.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Movies.view.MovieFormPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.movieformpanel',

    config: {
        height: '',
        id: 'movieformpanel',
        ui: '',
        items: [
            {
                xtype: 'image',
                height: 110,
                id: 'movieImage',
                itemId: 'movieImage',
                style: 'background-size: 65%; ',
                width: 159,
                src: ''
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                ui: 'neutral',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'updatebutton',
                        ui: 'action',
                        text: 'Update'
                    },
                    {
                        xtype: 'button',
                        itemId: 'deletebutton',
                        ui: 'action',
                        text: 'Delete'
                    },
                    {
                        xtype: 'button',
                        itemId: 'savebutton',
                        ui: 'action',
                        text: 'Duplicate'
                    },
                    {
                        xtype: 'button',
                        itemId: 'resetbutton',
                        ui: 'action',
                        text: 'Reset'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Movie Info',
                items: [
                    {
                        xtype: 'textfield',
                        itemId: 'ImdbId',
                        width: '',
                        label: 'Imdb Id',
                        name: 'ImdbId'
                    },
                    {
                        xtype: 'textfield',
                        width: '',
                        label: 'Title',
                        name: 'Title'
                    },
                    {
                        xtype: 'numberfield',
                        label: 'Rating',
                        name: 'Rating'
                    },
                    {
                        xtype: 'datepickerfield',
                        label: 'Release Date',
                        name: 'ReleaseDate'
                    },
                    {
                        xtype: 'textfield',
                        label: 'Tag Line',
                        name: 'TagLine'
                    },
                    {
                        xtype: 'textfield',
                        height: 112,
                        label: 'Genres',
                        name: 'Genres'
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onUpdatebuttonTap',
                event: 'tap',
                delegate: '#updatebutton'
            },
            {
                fn: 'onDeletebuttonTap',
                event: 'tap',
                delegate: '#deletebutton'
            },
            {
                fn: 'onSavebuttonTap',
                event: 'tap',
                delegate: '#savebutton'
            },
            {
                fn: 'onResetbuttonTap',
                event: 'tap',
                delegate: '#resetbutton'
            },
            {
                fn: 'onImdbIdChange',
                event: 'change',
                delegate: '#ImdbId'
            }
        ]
    },

    onUpdatebuttonTap: function(button, e, options) {
        // get the toolbar (up means parent)
        var toolbar =  button.up();
        // get the form (up means parent)
        var form =  toolbar.up();
        // get the record from the form
        var record = form.getRecord();
        // update the form data
        record.set(form.getValues());
        // save the record
        record.save({
            scope: this,
            failure: function(record, operation) {
                //do something if the load failed
                Ext.Msg.alert('Server Error', 'Can not update the record.', Ext.emptyFn);
            },
            success: function(record, operation) {
                //do something if the load succeeded
                Ext.Msg.alert('Info', 'record was updated to the web.', Ext.emptyFn);
            },
            callback: function(record, operation) {
                //do something whether the load succeeded or failed
            }
        });


    },

    onDeletebuttonTap: function(button, e, options) {

        var deleteRecord =  function ()
        {
            // get the toolbar (up means parent)
            var toolbar =  button.up();
            // get the form (up means parent)
            var form =  toolbar.up();
            // get the record from the form
            var record = form.getRecord();

            // delete the record (this means DELETE command will be sent to the web service)
            record.erase({
                scope: this,
                failure: function(record, operation) {
                    //do something if the load failed
                    Ext.Msg.alert('Server Error', 'Can not delete the record.', Ext.emptyFn);
                },
                success: function(record, operation) {
                    //do something if the load succeeded

                    //get the store
                    var store = Ext.getStore('MoviesStore');
                    // remove the record from the store
                    store.remove(record);

                    //  message about the change
                    Ext.Msg.alert('Info', 'record was deleted.', Ext.emptyFn);

                    // navigate to the movie edit form + update the title
                    var navView = Ext.getCmp('navView');

                    // get back to the list
                    navView.pop(); 

                },
                callback: function(record, operation) {
                    //do something whether the load succeeded or failed
                }
            });        
        };

        // ask before we delete
        Ext.Msg.confirm(
        'Confirm',
        'Are you sure you want to delete the record?',
        function(buttonId) 
        {
            if(buttonId == 'yes')
            {
                deleteRecord();
            }
        }
        );

    },

    onSavebuttonTap: function(button, e, options) {
        // get the toolbar (up means parent)
        var toolbar =  button.up();
        // get the form (up means parent)
        var form =  toolbar.up();
        // create a new record
        var record = Ext.create('Movies.model.Movie', {});
        // update the form data
        record.set(form.getValues());
        // save the record to db
        record.save({
            scope: this,
            failure: function(record, operation) {
                //do something if the load failed
                Ext.Msg.alert('Server Error', 'Can not save the new record.', Ext.emptyFn);
            },
            success: function(record, operation) {
                //do something if the load succeeded

                // update the form to use the new record
                form.setRecord(record);
                //get the store
                var store = Ext.getStore('MoviesStore');
                // update the store
                store.add(record);
                //  message about the change
                Ext.Msg.alert('Info', 'record was saved as a new record.', Ext.emptyFn);

            },
            callback: function(record, operation) {
                //do something whether the load succeeded or failed
            }
        });        


    },

    onResetbuttonTap: function(button, e, options) {
        // get the toolbar (up means parent)
        var toolbar =  button.up();
        // get the form (up means parent)
        var form =  toolbar.up();
        // get the record from the form
        var record = form.getRecord();
        // update the form data to the original state
        form.setRecord(record);
        //  message about the change
        Ext.Msg.alert('Info', 'The record was change to the values from before your changes.', Ext.emptyFn);
    },

    onImdbIdChange: function(textfield, newValue, oldValue, options) {
        // disabled for now - doesn't seem to work on the iPhone

        if(newValue && newValue !== '' )
        {

            var imdbMovieModel = Ext.ModelMgr.getModel('Movies.model.ImdbMovie');

            Ext.getCmp('movieImage').setSrc('http://www.sanjeevflexipack.com/images/preloader_transparent.gif');

            imdbMovieModel.load(newValue, {
                scope: this,
                failure: function(record, operation) {
                    //do something if the load failed
                    Ext.Msg.alert('Error', 'Id not found in IMDB!', Ext.emptyFn);
                    Ext.getCmp('movieImage').setSrc('http://www.formhandler.net/images/image-not-found.gif');
                },
                success: function(record, operation) {
                    //do something if the load succeeded
                    Ext.getCmp('movieImage').setSrc(record.get('Poster'));
                },
                callback: function(record, operation) {
                    //do something whether the load succeeded or failed
                }
            });
        }
        else
        {
            Ext.getCmp('movieImage').setSrc('http://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png');
        }

    }

});