/**
 * Created by glenn on 13/06/16.
 */

import stampit from 'stampit';

const Controller = stampit()
  .props({
    model: undefined,
    view : undefined,
  })
  .init(({ instance }) => {
    const { model, view } = instance;

    Object.assign(instance, {

      /**
       *
       * @param item
       */
      addListItem(item) {

        try {
          model.add(item);
          view.clearInput();
          view.setEmptyAlertHidden(true);
        } catch (e) {
          console.error(`Error adding list item.\n${e.stack}`);
        }
      },

      /**
       *
       * @param index
       */
      selectListItemAt(index) {

        try {
          model.selectAt(index);
          view.setRemoveButtonEnabled(true);
        } catch (e) {
          console.error(`Error selecting list item.\n${e.stack}`);
        }
      },

      /**
       *
       * @param index
       */
      removeListItemAt(index) {

        try {
          model.removeAt(index);
          view.setRemoveButtonEnabled(false);

          if (model.isEmpty()) {
            view.setEmptyAlertHidden(false);
          }
        } catch (e) {
          console.error(`Error removing list item.\n${e.stack}`);
        }
      },
    });
  });

export default Controller;
