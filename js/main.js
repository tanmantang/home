(function() {
	$(".fa-github").click(function() {
		window.open("https://www.github.com/tanmantang");
	})
	$(".fa-bilibili").click(function() {
		window.open("https://www.bilibili.com");
	})
	$(".fa-envelope").click(function() {
		window.open("mailto:tanmantang@foxmail.com");
	})

	function SVGMenu(el) {
		this.el = el;
		this.init();
	}

	SVGMenu.prototype.init = function() {
		this.trigger = this.el.querySelector('button.menu__handle');
		this.shapeEl = this.el.querySelector('div.morph-shape');

		var s = Snap(this.shapeEl.querySelector('svg'));
		this.pathEl = s.select('path');
		this.paths = {
			reset: this.pathEl.attr('d'),
			open: this.shapeEl.getAttribute('data-morph-open'),
			close: this.shapeEl.getAttribute('data-morph-close')
		};

		this.isOpen = false;

		this.initEvents();
	};

	SVGMenu.prototype.initEvents = function() {
		this.trigger.addEventListener('click', this.toggle.bind(this));
	};

	SVGMenu.prototype.toggle = function() {
		var self = this;

		if (this.isOpen) {
			classie.remove(self.el, 'menu--anim');
			setTimeout(function() {
				classie.remove(self.el, 'menu--open');
			}, 250);
		} else {
			classie.add(self.el, 'menu--anim');
			setTimeout(function() {
				classie.add(self.el, 'menu--open');
			}, 250);
		}
		this.pathEl.stop().animate({
			'path': this.isOpen ? this.paths.close : this.paths.open
		}, 350, mina.easeout, function() {
			self.pathEl.stop().animate({
				'path': self.paths.reset
			}, 800, mina.elastic);
		});

		this.isOpen = !this.isOpen;
	};

	new SVGMenu(document.getElementById('menu'));

})();

$(document).ready(function() {
	var toggle = $('#ss_toggle');
	var menu = $('#ss_menu');
	var rot;
	$('#ss_toggle').on('click', function() {
		rot = parseInt($(this).data('rot')) - 180;
		menu.css('transform', 'rotate(' + rot + 'deg)');
		menu.css('webkitTransform', 'rotate(' + rot + 'deg)');
		if (rot / 180 % 2 == 0) {
			toggle.parent().addClass('ss_active');
			toggle.addClass('close');
		} else {
			toggle.parent().removeClass('ss_active');
			toggle.removeClass('close');
		}
		$(this).data('rot', rot);
	});
	menu.on('transitionend webkitTransitionEnd oTransitionEnd', function() {
		if (rot / 180 % 2 == 0) {
			$('#ss_menu div i').addClass('ss_animate');
		} else {
			$('#ss_menu div i').removeClass('ss_animate');
		}
	});
});