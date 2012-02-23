/*
    Based on this script by Marcus Ekwall
    http://jsfiddle.net/mekwall/fNyHs/

    Author: Nikolay Kuchumov
    github: kuchumovn
    email: kuchumovn@gmail.com
*/

/* html:

<div class="fill_with_text little">This</div>

<div class="fill_with_text little">Lorum ipsum dolor sit amet</div>

<div class="fill_with_text much">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>​
*/

/* css:

.fill_with_text {
    width: 530px;
    height: 240px;
    font-size: 1px;
    text-align: center;
    border: 1px solid #ccc;
    margin: 10px;
    overflow: hidden;
}
*/

/* javascript:

$(function()
{
    $(".fill_with_text.little").fill_with_text()
    
    $(".fill_with_text.much").fill_with_text()
})​​
*/

(function($)
{
    var unit_of_measurement = 'px'
    
    function find_max_font_size(container)
    {
        var text = container.text()
        var available_height = container.outerHeight()
        var available_width = container.outerWidth()
        
        container.empty()
            
        var sandbox = $('<span/>').text(text).appendTo(container)
        
        function try_font_size(font_size)
        {
            sandbox.css({ fontSize: font_size + unit_of_measurement })
        }
        
        function find_max_font_size_starting_with(font_size)
        {
            font_size = font_size || 1
            try_font_size(font_size)
        
            var current_height = container[0].scrollHeight
            var current_width = container[0].scrollWidth
			
            var height_proportion = current_height / available_height
            var width_proportion = current_width / available_width
            
            if (height_proportion > 1 || width_proportion > 1)
                return font_size - 1
            else
                return find_max_font_size_starting_with(font_size + 1)
        }
        
        var font_size = find_max_font_size_starting_with(parseInt(container.css('fontSize')))
        container.empty().text(text)
        return font_size
    }
    
    $.fn.fill_with_text = function(options)
    {
        return $(this).each(function()
        {
            var container = $(this)
            container.css({ fontSize: find_max_font_size(container) + unit_of_measurement })
			
			if (options)
				if (options['center vertically'])
				{
					var label = $('<span/>').text(container.text()).appendTo(container.empty())
					label.css({ position: 'relative', top: parseInt((container.height() - label.height()) / 2) + 'px' })
				}
        })
    }
})(jQuery)