/*
 * File: app/view/MoviesList.js
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

Ext.define('Movies.view.MoviesList', {
    extend: 'Ext.dataview.List',
    alias: 'widget.movieslist',

    config: {
        height: '',
        emptyText: 'No movies found.',
        store: 'MoviesStore',
        disableSelection: true,
        itemTpl: [
            '<div>',
            '<h2>{Title}</h2>',
            '</div>'
        ],
        plugins: [
            {
                refreshFn: function(plugin) {
                    //get the store
                    var store = Ext.getStore('MoviesStore');


                    // sync the store
                    store.load();    

                },
                type: 'pullrefresh'
            }
        ]
    }

});