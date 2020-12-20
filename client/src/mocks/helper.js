import { shallow } from 'enzyme';

export function shallowUntilTarget(
  componentInstance,
  TargetComponent,
  { maxTries = 10, shallowOptions, _shallow = shallow } = {},
) {
  if (!componentInstance) {
    throw new Error('componentInstance parameter is required');
  }
  if (!TargetComponent) {
    throw new Error('TargetComponent parameter is required');
  }

  let root = _shallow(componentInstance, shallowOptions);

  if (typeof root.type() === 'string') {
    throw new Error('Cannot unwrap this component because it is not wrapped');
  }

  for (let tries = 1; tries <= maxTries; tries++) {
    if (root.is(TargetComponent)) {
      return root.shallow(shallowOptions);
    }
    root = root.dive();
  }

  throw new Error(oneLine`Could not find ${TargetComponent} in rendered
    instance: ${componentInstance}; gave up after ${maxTries} tries`);
}
