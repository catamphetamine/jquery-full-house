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
    font-size: 10px;
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
	var Font_size_increment_step = 10

	function get_initial_font_size(container)
	{
		if (container.css('fontSize'))
		{
			var check = container.css('fontSize').match(/[\d]+px/)
			if (check.length)
				return parseInt(check[0])
		}
		
		return 1
	}
	
	function find_max_font_size(container, options)
	{
		var text = container.text()
		var available_height = container.outerHeight()
		var available_width = container.outerWidth()
		
		container.empty()
		
		var sandbox = $('<span/>').text(text).appendTo(container)
		
		var maximum_fitting_font_size
		var minimum_too_big_font_size
		
		var step = Font_size_increment_step
		if (options && options.Font_size_increment_step)
			step = options.Font_size_increment_step
		
		function try_font_size(font_size)
		{
			container.css({ fontSize: font_size + 'px' })
		}
		
		function find_max_font_size_starting_with(font_size)
		{
			font_size = Math.ceil(font_size)
			if (font_size < 1)
				font_size = 1
				
			try_font_size(font_size)
			
			var current_height = container[0].scrollHeight
			var current_width = container[0].scrollWidth
			
			var height_proportion = current_height / available_height
			var width_proportion = current_width / available_width
			
			if (height_proportion > 1 || width_proportion > 1)
			{
				minimum_too_big_font_size = font_size
				
				if (maximum_fitting_font_size)
				{
					if (maximum_fitting_font_size === font_size - 1)
						return maximum_fitting_font_size
						
					return find_max_font_size_starting_with(maximum_fitting_font_size + (font_size - maximum_fitting_font_size) / 2)
				}
				else
				{
					if (font_size === 1)
						return 1
						
					return find_max_font_size_starting_with(font_size - step)
				}
			}
			else
			{
				maximum_fitting_font_size = font_size
				
				if (minimum_too_big_font_size)
				{
					if (minimum_too_big_font_size === font_size + 1)
						return font_size
						
					return find_max_font_size_starting_with(font_size + (minimum_too_big_font_size - font_size) / 2)
				}
				else
				{
					return find_max_font_size_starting_with(font_size + step)
				}
			}
		}
		
		var font_size = find_max_font_size_starting_with(get_initial_font_size(container))
		container.empty().text(text)
		return font_size
	}
	
	$.fn.fill_with_text = function(options)
	{
		return $(this).each(function()
		{
			var container = $(this)
			container.css({ fontSize: find_max_font_size(container, options) + 'px' })
			
			if (options)
				if (options['center vertically'])
				{
					var label = $('<span/>').text(container.text()).appendTo(container.empty())
					label.css({ position: 'relative', top: parseInt((container.height() - label.height()) / 2) + 'px' })
				}
		})
	}
})(jQuery)