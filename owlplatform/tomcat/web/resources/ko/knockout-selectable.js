ko.bindingHandlers.selectableItem = {
    init: function(element, valueAccessor, allBindingsAccessor) {
        var selectable = $(element).parent();

        selectable.bind('selectableselected', function(event, ui) {
            if(ui.selected === element) {
                var value = valueAccessor();

                value(true);
            }
        });

        selectable.bind('selectableunselected', function(event, ui) {
            if(ui.unselected === element) {
                var value = valueAccessor();

                value(false);
            }
        });
    },
    update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
        var el = $(element);

        if(valueAccessor()()) {
            el.addClass('ui-selected');
        } else {
            el.removeClass('ui-selected');
        }
    }
};
