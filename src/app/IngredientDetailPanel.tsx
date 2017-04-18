import * as React from 'react';
import styled from 'styled-components';
import { Ingredient } from '../types';
import * as styles from './styles';

const Header = styled.h2`
  margin: 0;
  padding-bottom: 8px;
  border-bottom: ${styles.LINE_COLOR} 1px solid;
`;

const Description = styled.p`
  font-size: 16px;
`;

const Panel = styled.div`
  background: ${styles.PANEL_BG_COLOR};
  box-shadow: ${styles.PANEL_OUTLINE_SHADOW};
  margin-right: 8px;
  margin-bottom: 40px;
  padding: 8px 24px;
`;

const IngredientDetailPanel = ({ ingredient }: { ingredient: Ingredient | null }) => (
  ingredient ? (
    <Panel>
      <Header>{ingredient.name}</Header>
      <Description>{ingredient.description}</Description>
    </Panel>
    ): <div />
);
export default IngredientDetailPanel;

