var
	color_map = [
		'black',
		'red',
		'green',
		'yellow',
		'blue',
		'magenta',
		'cyan',
		'white'
	],
	color_weights = [
		[0, 0, 0],
		[255, 0, 0],
		[0, 255, 0],
		[255, 255, 0],
		[0, 0, 255],
		[255, 0, 255],
		[0, 255, 255],
		[255, 255, 255]
	],
	reset = '\x1b[30m';

function hex_to_rgb ( hex ) {
	var
		base_16;

	if ( hex.indexOf('#') === 0 ) {
		hex = hex.slice(1);
	}
	base_16 = parseInt(hex, 16);
	if ( isNaN(base_16) ) {
		base_16 = 0;
	}
	return [
		( base_16 >> 16 ) & 255,
		( base_16 >> 8 ) & 255,
		base_16 & 255
	];
}

function get_fitness ( source, target ) {
	return Math.abs(source - target);
}

function get_closest_color ( red, green, blue ) {
	var
		current_color,
		best_color = null,
		current_fit,
		best_fit = 765,
		index = color_map.length;

	while ( index -- ) {
		current_color = color_weights [index];
		current_fit = get_fitness(red, current_color [0]) + get_fitness(green, current_color [1]) + get_fitness(blue, current_color [2]);
		if ( current_fit <= best_fit ) {
			best_fit = current_fit;
			best_color = color_map [index];
		}
	}
	return best_color;
}

function generate ( color ) {
	var
		resolved_color,
		index;

	function colorize ( text ) {
		if ( typeof text !== 'string' ) {
//			text = util.format(text);
		}
		return resolved_color + text + reset;
	}

	index = color_map.indexOf(color);
	if ( index !== -1 ) {
		resolved_color = '\x1b[3' + index + 'm';
	}
	else {
		resolved_color = reset;
	}

	return colorize;
}

export default function( color, green, blue ) {
	var
		index,
		resolved_color;

	if ( typeof color === 'string' ) {
		if ( color [0] === '#' ) {
			resolved_color = get_closest_color.apply(null, hex_to_rgb(color));
		}
	}
	else if ( typeof color === 'number' ) {
		resolved_color = get_closest_color(color, green, blue);
	}
	else {
		resolved_color = reset;
	}
	
	return generate(resolved_color);
}

color_map.map(function ( item ) {
	create_color [item] = generate(item);
});

