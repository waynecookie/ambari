/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var App = require('app');
var numberUtils = require('utils/number_utils');

App.NameNodeHeapPieChartView = App.PieChartDashboardWidgetView.extend({

  title: Em.I18n.t('dashboard.widgets.NameNodeHeap'),
  id: '1',

  model_type: 'hdfs',

 /* hiddenInfo: function () {
    var memUsed = this.get('model').get('jvmMemoryHeapUsed');
    var memCommitted = this.get('model').get('jvmMemoryHeapCommitted');
    var percent = memCommitted > 0 ? ((100 * memUsed) / memCommitted) : 0;
    var result = [];
    result.pushObject(percent.toFixed(1) + '% used');
    result.pushObject(numberUtils.bytesToSize(memUsed, 1, 'parseFloat', 1024 * 1024) + ' of ' + numberUtils.bytesToSize(memCommitted, 1, 'parseFloat', 1024 * 1024));
    return result;
  }.property('model.jvmMemoryHeapUsed', 'model.jvmMemoryHeapCommitted'),*/

  modelFieldMax: 'jvmMemoryHeapCommitted',
  modelFieldUsed: 'jvmMemoryHeapUsed',

  widgetHtmlId: 'widget-nn-heap',

  didInsertElement: function() {
    this._super();
    this.calc();
  },

  getUsed: function() {
    return this.get('model').get(this.get('modelFieldUsed')) * 1024 * 1024 || 0;
  },

  getMax: function() {
    return this.get('model').get(this.get('modelFieldMax')) * 1024 * 1024 || 0;
  }
});