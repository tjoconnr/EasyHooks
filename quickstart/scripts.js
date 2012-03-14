jQuery(function ($) {

    // Fade Effect for Page
    $('#container').fadeIn();

    // Fancy Text Box Instructions
    $('#txtURL').val( $('#txtURL').next().html() );
	
    $('#txtURL').focus(function () {
        $('#txtURL').addClass('active').addClass('on');
        if ( $('#txtURL').val() == $('#txtURL').next().html() ) $('#txtURL').val('');
    })
    .blur(function () {
        $('#txtURL').removeClass('active');
        if ( $('#txtURL').val() == '' ) $('#txtURL').val($('#txtURL').next().html()).removeClass('on');
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
		$(this).click(function(){ if(jQuery('#quickstart-step').val() > 0) viewStep(index+1) });	
	});

});


function nextStep() {
	var num = jQuery('#quickstart-step').val();    
	if (num <= 4){
		num++;
		viewStep(num);				
	} 	
}

function viewStep(num) {
	
	// Update Current Step
    if (console) console.log('viewStep("' + num + '")');
	jQuery('#quickstart-step').val(num);    

	// Hide/Show UI Elements
	jQuery('#quickstart-top > div:visible').hide();	
	jQuery('#quickstart-top > div:eq(' + num + ')').fadeIn();
	
	jQuery('#htmlFrame div:visible').hide();	
	jQuery('#htmlFrame div:eq(' + num + ')').fadeIn();
	
	jQuery('#quickstart-steps li.selected').removeClass('selected');
	if (num == 0) {
		jQuery('#btn-continue').hide();
		jQuery('#btn-finish').hide();
		jQuery('#btn-reset').hide();		
		jQuery('ul#quickstart-steps').removeClass('active');
		jQuery('#quickstart-steps li div:visible').hide();
	} else {
		jQuery('#quickstart-steps li div:visible').slideUp();
		jQuery('ul#quickstart-steps').addClass('active');
		jQuery('#quickstart-steps li:eq(' + (num-1) + ')').addClass('selected');		
		jQuery('#quickstart-steps li:eq(' + (num-1) + ') div').slideDown();
		
		if (num < 4) {
			jQuery('#btn-continue').show();
			jQuery('#btn-reset').show();
			jQuery('#btn-finish').hide();		
		} else if (num == 4) {
			jQuery('#btn-continue').hide();
			jQuery('#btn-finish').show();		
		}
	}
	
	// Call Panel Functions
	switch(num){
		case 0: resetPanels();
		case 1: viewLogo();
		case 2: viewColors();
		case 3: viewLayout();
		case 4: viewNav();
		default: break;
	}
}

function resetPanels()
{
	$('#txtURL').val($('#txtURL').next().html()).removeClass('on').removeClass('error'); 
	jQuery('#htmlFrame > div').html('');
}



function startQuickstart() {
    var strUrl = jQuery('#txtURL').val();
    if (console) console.log('startQuickstart("' + strUrl + '")');
    
    jQuery('#errorURL').hide();

    if (checkURL(strUrl)) {
        viewStep(1);
    }
    else {
        jQuery('#txtURL').addClass('error');
        jQuery('#errorURL').slideDown();
    }
}

function viewLogo(){
	if (jQuery('#quickstart-frame-logo a.logo-thumb').length == 0){
		jQuery('#htmlFrame iframe').attr('src', 'p/?url=' + encodeURI(jQuery('#txtURL').val()));
		jQuery('#htmlFrame iframe').load(function(){ 											  
			// Search all images
			jQuery('#htmlFrame iframe').contents().find('img').each(function(){
				var strImage = jQuery(this).attr('src');
				if (strImage.indexOf('http://tracking.hubspot.com/track') == -1)
					addLogo(strImage);
			});
	
	
			// Search background images
			jQuery('#htmlFrame iframe').contents().find('*').each(function(){
				var bgImage = jQuery(this).css('background-image');
				if (bgImage != 'none') {
					var strImage = bgImage.substring(4, bgImage.length - 1)
					addLogo(strImage);				
				}
			});
			
			jQuery('#quickstart-frame-logo').append('<a id="show-all" href="javascript:;" class="logo-thumb" onclick="showAllLogos()">Show all images >></a>')					
			
			
			
		});
	}
}
function showAllLogos(){	
	jQuery('#show-all').hide()
	jQuery('#quickstart-frame-logo a.show-more').removeClass('show-more');
}
function addLogo(strImage){
	var strClass = "";
	if(strImage.indexOf('logo') == -1) strClass = "show-more"
	jQuery('#quickstart-frame-logo').append('<a href="javascript:;" class="logo-thumb ' + strClass + '" onclick="chooseLogo(this)"><img src="' + strImage + '" alt=" " /></a>')					
}
function chooseLogo(sender){
	jQuery('#quickstart-frame-logo a.selected').removeClass('selected');
	jQuery(sender).addClass('selected');
	jQuery('#quickstart-logo-preview').css('background', 'url(' + jQuery(sender).find('img').attr('src') + ') no-repeat');	
}

function viewColors(){}
function viewLayout(){}
function viewNav(){}

function checkURL(value) {
    var urlregex = new RegExp(
        "^http(s)*:\/\/([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}\/*$");
    if (urlregex.test(value)) {
        return (true);
    }
    return (false);
}

/*

function bindText() {
    
jQuery('div.login input.text').each(function () {
if (this.value == jQuery(this).next('span').html()) {
jQuery(this).addClass('off');
}
});
jQuery('div.login input.text').focus(function () {
jQuery(this).addClass('selected');
if (this.value == jQuery(this).next('span').html()) {
jQuery(this).removeClass('off');
this.value = '';
}
});
jQuery('div.login input.text').blur(function () {
jQuery(this).removeClass('selected');
if (this.value == '') {
jQuery(this).addClass('off');
this.value = jQuery(this).next('span').html();
}
});
jQuery('div.login input.password_top').focus(function () {
jQuery(this).hide();
jQuery('div.login input.password').addClass('selected').show().focus();
});
jQuery('div.login input.password').focus(function () {
jQuery('div.login input.password').addClass('selected');
});
jQuery('input.password').blur(function () {
jQuery(this).removeClass('selected');
if (jQuery(this).val() == '') {
jQuery(this).hide();
jQuery('div.login input.password_top').show();
}
});
});
}
jQuery(function () {
bindText();
});
*/