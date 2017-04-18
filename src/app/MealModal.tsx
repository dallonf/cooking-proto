import * as React from 'react';
import styled from 'styled-components';
import { Meal } from '../types';
import * as styles from './styles';
import formatEffect from './formatEffect';

const FullPageCenter = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  width: 560px;
`;
const Modal = styled.div`
  min-height: 210px;
  background: ${styles.PANEL_BG_COLOR};
  border-radius: 6px;
  padding: 27px;
  padding-left: 175px;
`;
const HR = styled.hr`
  border: ${styles.LINE_COLOR} 1px solid;
`;
const Button = styled(styles.Button)`
  margin-top: 8px;
  width: 100%;
`;

const MealModal = ({ meal, onConfirm }: { meal: Meal, onConfirm: () => void }) => (
  <FullPageCenter>
    <Container>
      <Modal>
        <h2>{meal.name}</h2>
        <HR />
        <ul>
          <li>Heals {meal.hearts} hearts</li>
          { meal.effects.map((e, i) => 
            <li key={i}>{formatEffect(e)}</li>
          ) }
        </ul>
        <p>
          {meal.description}
        </p>
      </Modal>
      <Button onClick={onConfirm}>OK</Button>
    </Container>
  </FullPageCenter>
);
export default MealModal;