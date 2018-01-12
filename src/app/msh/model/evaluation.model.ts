import {User} from './user.model';
import {Skill} from './skill.model';
import {SkillLevel} from './skill-level.model';

export class Evaluation {
    id: number;
    user: User;
    skill: Skill;
    selfEvaluation: SkillLevel;
    leaderEvaluation: SkillLevel;
    selfExplanation: string;
    leaderExplanation: string;
}
