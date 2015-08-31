/**
 * @license
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

CLASS({
  package: 'foam.apps.builder',
  name: 'ModelSummaryView',
  extendsModel: 'foam.apps.builder.SummaryView',

  requires: [
    'foam.apps.builder.datamodels.ModelCitationView',
    'foam.apps.builder.wizard.ChangeModelWizard',
  ],

  properties: [
    {
      name: 'wizardStartPageName',
      defaultValue: 'foam.apps.builder.wizard.ChangeModelWizard',
    },
    {
      name: 'citationViewFactory',
      defaultValue: function() {
        return this.ModelCitationView.create({ data: this.data.model });
      }
    },
//     {
//       name: 'model'
//     },
//     {
//       name: 'data',
//       postSet: function(old,nu) {
//         if (nu) this.model = nu.model;
//       }
//     }
  ],

});
