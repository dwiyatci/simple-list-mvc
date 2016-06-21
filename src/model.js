/**
 * Created by glenn on 13/06/16.
 */

import stampit from 'stampit';

const Model = stampit()
  .init(({ instance }) => {
    const list            = [];
    let selectedItemIndex = NaN;
    let view_;

    Object.assign(instance, {

      /**
       *
       * @param view
       */
      setView(view) {
        view_ = view;
      },

      /**
       *
       * @param item
       */
      add(item) {
        list.push(item);

        view_.onItemAdded(item);
      },

      /**
       *
       * @param index
       */
      selectAt(index) {
        selectedItemIndex = index;

        view_.onItemSelected(index);
      },

      /**
       *
       * @returns {*}
       */
      getSelectedItemIndex() {
        return selectedItemIndex;
      },

      /**
       *
       * @param index
       */
      removeAt(index) {
        list.splice(index, 1);

        selectedItemIndex = NaN;

        view_.onItemRemoved(index);
      },

      /**
       *
       * @returns {boolean}
       */
      isEmpty() {
        return list.length === 0;
      },
    });
  });

export default Model;
