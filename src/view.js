/**
 * Created by glenn on 13/06/16.
 */

import stampit from 'stampit';
import $ from 'jquery';

const viewTemplate = require('view.tpl');

const View = stampit()
  .props({
    model: undefined,
  })
  .init(({ instance }) => {
    const app = $('#app');
    const { model } = instance;
    let controller_;

    Object.assign(instance, {

      /**
       *
       * @param controller
       */
      setController(controller) {
        controller_ = controller;
      },

      /**
       *
       */
      clearInput() {
        enterItemInput.val('');
      },

      /**
       *
       * @param enabled
       */
      setRemoveButtonEnabled(enabled) {
        removeItemButton.prop('disabled', !enabled);
      },

      /**
       *
       * @param hidden
       */
      setEmptyAlertHidden(hidden) {
        listGroupWrapper.toggleClass('hidden', !hidden);
        emptyAlert.toggleClass('hidden', hidden);
      },

      /**
       *
       * @param item
       */
      onItemAdded(item) {
        $('<li>')
          .addClass('list-group-item')
          .text(item)
          .appendTo(listGroup);
      },

      /**
       *
       * @param index
       */
      onItemSelected(index) {
        listGroup
          .find('.list-group-item')
          .removeClass('active')
          .eq(index)
          .addClass('active');
      },

      /**
       *
       * @param index
       */
      onItemRemoved(index) {
        listGroup
          .find('.list-group-item')
          .eq(index)
          .remove();
      },
    });

    app.html(viewTemplate);

    const simpleList       = app.find('.simple-list');
    const enterItemInput   = simpleList.find('[name="enter-item"]');
    const addItemButton    = simpleList.find('[name="add-item"]');
    const listGroupWrapper = simpleList.find('.list-group-wrapper');
    const listGroup        = simpleList.find('.list-group');
    const removeItemButton = simpleList.find('[name="remove-item"]');
    const emptyAlert       = simpleList.find('.empty-alert');

    enterItemInput.on('keyup', (e) => {

      if (e.which === 13) {
        controller_.addListItem(enterItemInput.val());
      }
    });

    addItemButton.on('click', () =>
      controller_.addListItem(enterItemInput.val()));

    listGroup.on('click', '.list-group-item', e =>
      controller_.selectListItemAt($(e.currentTarget).index()));

    removeItemButton.on('click', () =>
      controller_.removeListItemAt(model.getSelectedItemIndex()));
  });

export default View;
