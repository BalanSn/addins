//
// document-data-api-tester.js
//
// ChemDraw JavaScript add-in example that demonstrates the usage of ChemDraw
// JavaScript API for adding and getting data in the active document.
// The supported data formats are Base64 CDX, CDXML, PNG, InChI, InChIKey,
// MolV2000, MolV3000, RXNV2000, RXNV3000, and SMILES.
//
// Copyright (c) 2017 PerkinElmer, Inc. All rights reserved.

// ESLint configuration
/* global ChemDrawAPI, $ */

$(function() {
    function resizeWindowToContent() {
        // We use a fixed width and fit to the height of our content
        ChemDrawAPI.window.resizeTo(900, $('#add-in-content').height());
    }

    function setText(text) {
        $('#text-data').val(text);

        $('#text-content').show();
        $('#image-content').hide();

        resizeWindowToContent();
    }

    function setImage(base64Image) {
        $('#image-data').attr('src', 'data:image/png;base64,' + base64Image);

        $('#text-content').hide();
        $('#image-content').show();

        $('#image-data').on("load", function() {
            resizeWindowToContent();
        });
    }

    function addData() {
        try {
            var documentData = $('#text-data').val();
            if (!documentData)
            {
                documentData = '';
            }

            switch ($('#data-format').val()) {
            case 'cdxml':
                ChemDrawAPI.activeDocument.addCDXML(documentData);
                break;

            case 'base64-cdx':
                ChemDrawAPI.activeDocument.addCDXBase64Encoded(documentData);
                break;

            case 'smiles':
                ChemDrawAPI.activeDocument.addSMILES(documentData);
                break;

            case 'inchi':
                ChemDrawAPI.activeDocument.addInChI(documentData);
                break;

            case 'molv2000':
                ChemDrawAPI.activeDocument.addMolV2000(documentData);
                break;

            case 'molv3000':
                ChemDrawAPI.activeDocument.addMolV3000(documentData);
                break;

            case 'mol':
                ChemDrawAPI.activeDocument.addMol(documentData);
                break;

            case 'rxnv2000':
                ChemDrawAPI.activeDocument.addRXNV2000(documentData);
                break;

            case 'rxnv3000':
                ChemDrawAPI.activeDocument.addRXNV3000(documentData);
                break;

            default:
                alert('Adding data as the selected format is not supported');
            }
        } catch (err) {
            alert(err.message);
        }
    }

    function getData() {
        try {
            switch ($('#data-format').val()) {
            case 'cdxml':
                setText(ChemDrawAPI.activeDocument.getCDXML());
                break;

            case 'base64-cdx':
                setText(ChemDrawAPI.activeDocument.getCDXBase64Encoded());
                break;

            case 'smiles':
                setText(ChemDrawAPI.activeDocument.getSMILES());
                break;

            case 'png-default':
            case 'png-scaled-150':
            case 'png-scaled-75':
            case 'png-with-background':
            case 'png-with-border':
                setImage(ChemDrawAPI.activeDocument.getPNGBase64Encoded({
                    transparent: $('#image-transparent').prop('checked'),
                    scalePercent: parseInt($('#image-scale').val()),
                    borderSizeInPixels: parseInt($('#image-border').val())
                }));
                break;

            case 'inchi':
                setText(ChemDrawAPI.activeDocument.getInChI());
                break;

            case 'inchikey':
                setText(ChemDrawAPI.activeDocument.getInChIKey());
                break;

            case 'molv2000':
                setText(ChemDrawAPI.activeDocument.getMolV2000());
                break;

            case 'molv3000':
                setText(ChemDrawAPI.activeDocument.getMolV3000());
                break;

            case 'rxnv2000':
                setText(ChemDrawAPI.activeDocument.getRXNV2000());
                break;

            case 'rxnv3000':
                setText(ChemDrawAPI.activeDocument.getRXNV3000());
                break;

            default:
                alert('Getting data as the selected format is not supported');
            }
        } catch (err) {
            alert(err.message);
        }
    }

    $(document).ready(function() {
        resizeWindowToContent();

        $('#add-data-button').click(function() {
            addData();
        });

        $('#get-data-button').click(function() {
            getData();
        });

        $('#clear-button').click(function() {
            setText('');
        });
    });

    function switchToImageMode() {
        $('#add-data-button').attr('disabled', 'disabled');
        $('#get-data-button').removeAttr('disabled');
        $('#text-content').hide();
        $('#image-content').show();
    }

    function switchToTextMode() {
        $('#add-data-button').removeAttr('disabled');
        $('#get-data-button').removeAttr('disabled');
        $('#image-content').hide();
        $('#text-content').show();
    }

    $('#data-format').change(function(){
        switch ($('#data-format').val()) {
        case 'png-default':
            $('#image-transparent').prop('checked', true);
            $('#image-scale').val(100);
            $('#image-border').val(0);
            switchToImageMode();
            break;

        case 'png-scaled-150':
            $('#image-transparent').prop('checked', true);
            $('#image-scale').val(150);
            $('#image-border').val(0);
            switchToImageMode();
            break;
            
        case 'png-scaled-75':
            $('#image-transparent').prop('checked', true);
            $('#image-scale').val(75);
            $('#image-border').val(0);
            switchToImageMode();
            break;
            
        case 'png-with-background':
            $('#image-transparent').prop('checked', false);
            $('#image-scale').val(100);
            $('#image-border').val(0);
            switchToImageMode();
            break;
            
        case 'png-with-border':
            $('#image-transparent').prop('checked', false);
            $('#image-scale').val(100);
            $('#image-border').val(100);
            switchToImageMode();
            break;

        case 'inchikey':
            switchToTextMode();
            $('#add-data-button').attr('disabled', 'disabled');
            break;

        case 'mol':
            switchToTextMode();
            $('#get-data-button').attr('disabled', 'disabled');
            break;

        default:
            switchToTextMode();
        }
    });
});