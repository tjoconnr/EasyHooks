/*
***********************************************************************************
**
**   HubSpot QuickStart 
**   Scripts.js
**   TJ O'Connor
**   3/12/2012
**
***********************************************************************************
*/

/*
***********************************************************************************
** Page Init
***********************************************************************************
*/
jQuery(function ($) {


    // Init all panels	
    resetPanels();

    // Fade Effect for Page
    $('#container').fadeIn();

    // Fancy Text Box Instructions
    $('#txtURL').val($('#txtURL').next().html());

    $('#txtURL').focus(function () {
        $('#txtURL').addClass('active').addClass('on');
        if ($('#txtURL').val() == $('#txtURL').next().html()) $('#txtURL').val('');
    })
    .blur(function () {
        $('#txtURL').removeClass('active');
        if ($('#txtURL').val() == '') $('#txtURL').val($('#txtURL').next().html()).removeClass('on');
    });


    // Add Click Handlers
    $('#btnURL').click(function () {
        startQuickstart();
    });
    $('#btn-continue').click(function () {
        nextStep();
    });
    $('#btn-reset').click(function () {
        viewStep(0);
    });
    $('#btn-finish').click(function () {
        alert('Finished');
    });
    $('#quickstart-steps li').each(function (index, value) {
        $(this).click(function () { if (jQuery('#quickstart-step').val() > 0) viewStep(index + 1) });
    });
	
	// TESTING ONLY *
	/*
	jQuery('#txtURL').val('http://omega-labs.co/');
	jQuery('#btnURL').click();
	*/

});

/*
***********************************************************************************
** UI Elements
***********************************************************************************
*/
function nextStep() {
    var intMax = jQuery('#htmlFrame div.help').length;
    var num = jQuery('#quickstart-step').val();
    if (num <= intMax) {
        num++;
        viewStep(num);
    }
}

function viewStep(num) {

    if (jQuery('#quickstart-step').val() != num) { // Don't need to switch if currently selected

        var intMax = jQuery('#htmlFrame div.help').length;

        // Update Current Step
        if (console) console.log('viewStep("' + num + '")');
        jQuery('#quickstart-step').val(num);

        // Show Top Panel
        jQuery('#quickstart-top > div:visible').hide();
        jQuery('#quickstart-top > div:eq(' + num + ')').fadeIn();

        // Show Main Panel
        jQuery('#htmlFrame > div:visible').hide();
        jQuery('#htmlFrame > div:eq(' + (num + 1) + ')').fadeIn();

        // De-select current menu item
        jQuery('#quickstart-steps li.selected').removeClass('selected');

        if (num == 0) {
            // Start over, hide all buttons
            jQuery('#btn-continue').hide();
            jQuery('#btn-finish').hide();
            jQuery('#btn-reset').hide();
            jQuery('ul#quickstart-steps').removeClass('active');
            jQuery('#quickstart-steps li > div:visible').hide();
        } else {

            // Show correct list item
            jQuery('#quickstart-steps li > div:visible').slideUp();
            jQuery('ul#quickstart-steps').addClass('active');
            jQuery('#quickstart-steps li:eq(' + (num - 1) + ')').addClass('selected');
            jQuery('#quickstart-steps li:eq(' + (num - 1) + ') > div').slideDown();

            // Show correct buttons
            if (num < intMax) {
                jQuery('#btn-continue').show();
                jQuery('#btn-reset').show();
                jQuery('#btn-finish').hide();
            } else if (num == intMax) {
                jQuery('#btn-continue').hide();
                jQuery('#btn-finish').show();
            }
        }

        // Call Panel Functions
        if (console) console.log('viewStep("' + num + '")');
        switch (num) {
            case 0: resetPanels(); break;
            case 1: bindLogo(); break;
            case 2: bindColors(); break;
            case 3: bindNav(); break;
            //case 4: viewLayout(); break;  
            default: break;
        }
    }
}

function resetPanels() {
    resetURL();
    resetLogo();
    resetColors();
    resetNav();
}
/*
***********************************************************************************
** Quickstart
***********************************************************************************
*/
function startQuickstart() {

    // Get user-entered URL
    var strUrl = jQuery('#txtURL').val();
    if (console) console.log('startQuickstart("' + strUrl + '")');

    // Hide error message    
    jQuery('#errorURL').hide();


    if (checkURL(strUrl)) {
        // Validated URL
        viewStep(1);
    }
    else {
        // Show error message
        jQuery('#txtURL').addClass('error');
        jQuery('#errorURL').slideDown();
    }
}
function resetURL() {
    jQuery('#txtURL').val(jQuery('#txtURL').next().html()).removeClass('on').removeClass('error');
}

/*
***********************************************************************************
** LOGO
***********************************************************************************
*/
function bindLogo() {
    if (console) console.log('bindLogo()')
	
	// Only populate if empty
    if (jQuery('#quickstart-frame-logo a.logo-thumb').length == 0) {

        // Show Ajax Loading
        jQuery('#quickstart-frame-loading').fadeIn();

        // Bind IFRAME Load Event
        jQuery('#htmlFrame iframe').bind('load', function () {            

            // Search all images
            jQuery('#htmlFrame iframe').contents().find('img').each(function () {
                addLogo(jQuery(this)[0].src);
            });

            // Search background images
            jQuery('#htmlFrame iframe').contents().find('*').each(function () {
                var bgImage = jQuery(this).css('background-image');
                if (bgImage != 'none') {
                    var strImage = bgImage.substring(4, bgImage.length - 1)
                    addLogo(strImage);
                }
            });


            // Re-sort images so the "guesses" show first
            if (jQuery('#quickstart-frame-logo a.show-me').length > 0) {
                jQuery('#quickstart-frame-logo a.show-me').prependTo('#quickstart-frame-logo > div');
            } else {
                showAllLogos(); // If there are no "guesses", show all images
            }

            jQuery('#quickstart-frame-logo > div').append('<a id="show-all" href="javascript:;" class="show-all" onclick="showAllLogos()">Show all images >></a>')
            setTimeout(function () { jQuery('#quickstart-frame-loading').fadeOut(); }, 500);
            jQuery('#quickstart-frame-logo').fadeIn();
            jQuery('#htmlFrame iframe').unbind('load'); // Unbind the load event, so it doesn't re-trigger next time through

        });
        jQuery('#htmlFrame iframe').attr('src', 'p/?url=' + encodeURI(jQuery('#txtURL').val()));
    }
}
function showAllLogos() {
    jQuery('#show-all').hide()
    jQuery('#quickstart-frame-logo a.show-more').removeClass('show-more');
}
function addLogo(strImage) {   

    // Try to guess the correct image, based on string "logo" in the filename
    var strClass = "";
    if (strImage.indexOf('logo') > 0 || strImage.indexOf('header') > 0)
        strClass = "show-me"
    else
        strClass = "show-more"

    // Add to DOM
    jQuery('#quickstart-frame-logo > div').append('<a href="javascript:;" class="logo-thumb ' + strClass + '" onclick="chooseLogo(this)"><img src="' + strImage + '" alt=" " /></a>');
}
function chooseLogo(sender) {
    // Update selected logo in main panel
    jQuery('#quickstart-frame-logo a.selected').removeClass('selected');
    jQuery(sender).addClass('selected');

    // Update logo in navigation preview
    jQuery('#quickstart-logo-preview').css('background-image', 'url(' + jQuery(sender).find('img').attr('src') + ')');
}

function resetLogo() {
    // Reset the logo
    jQuery('#quickstart-logo-preview').css('background-image', 'none');
    jQuery('#quickstart-frame-logo > div').html('');
}
/*
***********************************************************************************
** Colors
***********************************************************************************
*/
function bindColors() {
	
	// Only populate if empty
	if(jQuery('#quickstart-frame-colors a.color-swatch').length == 0){	
	
		// Find Header Colors
		var arrHeader = new Array();
		jQuery('#htmlFrame iframe').contents().find('h1,h2,h3,h4,p').each(function () {
			var c = jQuery(this).css('color');
			if (arrHeader.indexOf(c) == -1){
				arrHeader.push(c);
			}
		});	
		addColorHeader('Header Color');
		for (var i = 0; i < arrHeader.length; i++) {
			addColorSwatch(arrHeader[i], 'header');
		}
		
		// Add Line Break
		addColorBreak();
		
		// Find Nav Colors
		var arrNav = new Array();
		jQuery('#htmlFrame iframe').contents().find('ul.nav, #nav, #nav > .wrap, ul, li').each(function () {
			var c = jQuery(this).css('background-color');
			if (arrNav.indexOf(c) == -1){
				arrNav.push(c);
			}
		});	
		addColorHeader('Navigation Bar');
		for (var i = 0; i < arrNav.length; i++) {
			addColorSwatch(arrNav[i], 'nav');
		}
		
		// Add Line Break
		addColorBreak();
		
		// Find Background Colors
		var arrBackground = new Array();
		jQuery('#htmlFrame iframe').contents().find('html,body,body>div,#container,#page').each(function () {
			var c = jQuery(this).css('background-color');
			if (arrBackground.indexOf(c) == -1){
				arrBackground.push(c);
			}
		});	
		addColorHeader('Page Background');
		for (var i = 0; i < arrBackground.length; i++) {
			addColorSwatch(arrBackground[i], 'bg');
		}
	}

}
function addColorHeader(strText){
	jQuery('#quickstart-frame-colors > div').append('<h2>' + strText + '</h2>');
}
function addColorSwatch(strColor, strClass){
	jQuery('#quickstart-frame-colors > div').append('<a href="javascript:;" class="color-swatch ' + strClass + '" onclick="chooseColor(this)" style="background:' + strColor + '"></a>');
}
function addColorBreak(){
	jQuery('#quickstart-frame-colors > div').append('<hr />');
}

function chooseColor(sender) {
	var bg = jQuery(sender).css('background-color');
	if (console) console.log('Color: ' + bg);
	if (jQuery(sender).hasClass('header')) {		
		jQuery('#quickstart-frame-colors a.header').removeClass('selected');
	    jQuery(sender).addClass('selected');		
    	jQuery('#color-header > span').css('background-color', bg);				
	} else if (jQuery(sender).hasClass('nav')) {		
		jQuery('#quickstart-frame-colors a.nav').removeClass('selected');
	    jQuery(sender).addClass('selected');		
    	jQuery('#color-menu > span').css('background-color', bg);				
	} else if (jQuery(sender).hasClass('bg')) {		
		jQuery('#quickstart-frame-colors a.bg').removeClass('selected');
	    jQuery(sender).addClass('selected');		
    	jQuery('#color-background > span').css('background-color', bg);				
	}
}

function resetColors() {
    jQuery('#color-header span.swatch').css('background', 'black');
    jQuery('#color-menu span.swatch').css('background', 'orange');
    jQuery('#color-background span.swatch').css('background', '#ededed');
	jQuery('#quickstart-frame-colors > div').html('');
}

/*
***********************************************************************************
** Navigation
***********************************************************************************
*/
function bindNav() { }
function resetNav() { }

/*
***********************************************************************************
** Utilities
***********************************************************************************
*/
function checkURL(value) {
    var urlregex = new RegExp(
        "^http(s)*:\/\/([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}\/*$");
    if (urlregex.test(value)) {
        return (true);
    }
    return (false);
}
