import 'core-js/stable';
import 'regenerator-runtime/runtime';

const testsContext = require.context(".", true, /_spec$/);
testsContext.keys().forEach(testsContext);
