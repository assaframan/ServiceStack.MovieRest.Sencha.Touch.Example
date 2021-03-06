/*
 * File: app/model/ImdbMovie.js
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

Ext.define('Movies.model.ImdbMovie', {
    extend: 'Ext.data.Model',
    config: {
        clientIdProperty: 'i',
        idProperty: 'i',
        fields: [
            {
                name: 'imdbID'
            },
            {
                name: 'Poster'
            },
            {
                name: 'Title'
            },
            {
                name: 'imdbRating'
            },
            {
                dateFormat: 'd M Y',
                name: 'Released',
                type: 'date'
            },
            {
                name: 'Plot'
            },
            {
                name: 'Genre'
            }
        ],
        proxy: {
            type: 'jsonp',
            timeout: 10000,
            url: 'http://www.imdbapi.com/',
            reader: {
                type: 'json',
                idProperty: 'i'
            }
        }
    }
});