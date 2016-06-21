/**
 * Created by glenn on 13/06/16.
 */

import 'styles';
import Model from './model';
import View from './view';
import Controller from './controller';

const model      = Model.create();
const view       = View.create({ model });
const controller = Controller.create({ model, view });

model.setView(view);
view.setController(controller);
