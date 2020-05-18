import styled, { StyledComponent } from 'styled-components'

interface oneAnidom {
  dom: StyledComponent<any, any>;
  delay?: number;
  duraion: number;
  replace?: string;
  startSameNext?: boolean;
}
const aniStepMaker = (aniDoms: oneAnidom[]): StyledComponent<any, any>[] => {
  const result: StyledComponent<any, any>[] = [];

  let delayOverlap = 0;
  for (const oneDom of aniDoms) {
    const addDelay = oneDom.delay || 0

    const defaultParameter = `
        animation-duration: ${oneDom.duraion}s;
        animation-delay: ${delayOverlap + addDelay}s;
      `;
    const parameter = oneDom.replace
      ? oneDom.replace.replace('$here!', defaultParameter)
      : defaultParameter;

    result.push(
      styled(oneDom.dom)`
        ${parameter}
      `,
    );

    if (!oneDom.startSameNext) {
      delayOverlap += oneDom.duraion;
    }
  }

  return result;
}

export default aniStepMaker