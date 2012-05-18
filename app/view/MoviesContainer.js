/*
 * File: app/view/MoviesContainer.js
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

Ext.define('Movies.view.MoviesContainer', {
    extend: 'Ext.Container',
    alias: 'widget.moviescontainer',
    requires: [
        'Movies.view.MoviesList'
    ],

    config: {
        layout: {
            type: 'fit'
        },
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                ui: 'neutral',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'ResetDbButton',
                        ui: 'action',
                        text: 'Reset DB'
                    },
                    {
                        xtype: 'button',
                        itemId: 'changeServerUrlButton',
                        ui: 'action',
                        text: 'Change Server Url'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        itemId: 'AddMovieButton',
                        ui: 'action',
                        text: 'Add'
                    }
                ]
            },
            {
                xtype: 'movieslist',
                itemId: 'mylist1'
            }
        ],
        listeners: [
            {
                fn: 'onResetDbButtonTap',
                event: 'tap',
                delegate: '#ResetDbButton'
            },
            {
                fn: 'onChangeServerUrlButtonTap',
                event: 'tap',
                delegate: '#changeServerUrlButton'
            },
            {
                fn: 'onAddMovieButtonTap',
                event: 'tap',
                delegate: '#AddMovieButton'
            },
            {
                fn: 'onListItemTap',
                event: 'itemtap',
                delegate: '#mylist1'
            }
        ]
    },

    onResetDbButtonTap: function(button, e, options) {
        var restServiceUrl = Movies.app.getApplication().getResetServiceUrl();

        try {    
            var req = new XMLHttpRequest();
            req.open('POST', restServiceUrl, false);
            // req.overrideMimeType('text/plain; charset=x-user-defined'); // moz only
            req.send(null);
            if (req.status != 200) 
            {
                Ext.Msg.alert('Error', 'Error while tring to reset the database.', Ext.emptyFn);
            }
            else
            {
                Ext.Msg.alert('Info', 'The database is back to the original Top 5 movies..', Ext.emptyFn);
                //get the store
                var store = Ext.getStore('MoviesStore');

                // reload the store
                store.load();

            }
        }
        catch(err)
        {
            Ext.Msg.alert('Error', 'Error while tring to reset the database.', Ext.emptyFn);    
        }

    },

    onChangeServerUrlButtonTap: function(button, e, options) {
        Ext.Msg.prompt(
        'Enter Url!',
        'Enter server url',
        function (buttonId, value) {
            if(buttonId == 'ok')
            {
                Movies.app.getApplication().setServicesRootUrl(value);
                //Movies.app.getApplication().updateMoviesStoreAndModelPRoxyUrl();
                history.go(0); // reload page
            }
        },
        null,
        false,
        Movies.app.getApplication().getServicesRootUrl(),
        { autoCapitalize : true, placeHolder : 'Some url...' }
        );
    },

    onAddMovieButtonTap: function(button, e, options) {
        // create a new record
        var record = Ext.create('Movies.model.Movie', {
            Title: 'new movie',
            ImdbId: '',
            Rating: 0
        });


        record.save({
            scope: this,
            failure: function(record, operation) {
                //do something if the load failed
                Ext.Msg.alert('Server Error', 'Can not add the new record.', Ext.emptyFn);
            },
            success: function(record, operation) {
                //do something if the load succeeded

                //get the store
                var store = Ext.getStore('MoviesStore');
                // update the store
                store.add(record);

                // navigate to the movie edit form + update the title
                var navView = Ext.getCmp('navView');
                navView.push({
                    xtype: 'movieformpanel',
                    title: 'Edit Movie'
                });

                // get the form (this line needs to come after the navView.push - else the form will not exist the first time)
                var movieForm = Ext.getCmp('movieformpanel');

                // sets the form record - meaning data - based on the parameter we got from the list
                movieForm.setRecord(record);

                Ext.Msg.alert('Info', 'A new record was added, edit it.', Ext.emptyFn);


            },
            callback: function(record, operation) {
                //do something whether the load succeeded or failed
            }
        });        



    },

    onListItemTap: function(dataview, index, target, record, e, options) {
        // navigate to the movie edit form + update the title
        var navView = Ext.getCmp('navView');
        navView.push({
            xtype: 'movieformpanel',
            title: 'Edit Movie'
        });

        // get the form (this line needs to come after the navView.push - else the form will not exist the first time)
        var movieForm = Ext.getCmp('movieformpanel');

        // sets the form record - meaning data - based on the parameter we got from the list
        Movies.app.disableNextImdbRecordUpdate = true;
        movieForm.setRecord(record);


    }

});