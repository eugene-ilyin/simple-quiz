import {IQuestion} from "../app/interfaces/iquestion";

export const QUESTIONS: IQuestion[] = [
  {
    qtext: "Your mentor has prepared a computer for you. You've found that there is OS you familiar with, but you hate the installed GUI.\n" +
    "Your today task is to clone and configure the project.\n" +
    "What will you do?",
    answers: [
      {
        atext: "I don't want to suffer. I can easily install a GUI which I prefer and resolve the task after.",
        results: [
          {
            rtext: "You've spent all the day to configure the GUI and achieve success. \n" +
            "You didn't configure the project, what has disappointed your mentor. \n" +
            "But you've learned something new, maybe it will help you on an exam.",
            chance: 65,
            p1: -15,
            p2: 5
          },
          {
            rtext: "You've configured needed GUI very fast and switched to the configuration of the project. \n" +
            "At the end of the day, all were done. You've got new knowledge and your mentor has praised you.",
            chance: 35,
            p1: 0,
            p2: 8
          }
        ]
      },
      {
        atext: "Try to adapt to this annoying GUI and concentrate on the main task.",
        results: [
          {
            rtext: 'You are very disciplined. The project was configured successfully and you are ready for a next task.',
            chance: 100,
            p1: -15,
            p2: 5
          }
        ]
      },
      {
        atext: "Ask an admin to help with configuration of new GUI.",
        results: [
          {
            rtext: "An admin has configured needed GUI very fast.\n" +
            "You have successfully configured the project and were ready to take a new task.\n" +
            "You've got new knowledge and your mentor has praised you.",
            chance: 50,
            p1: 5,
            p2: 5
          },
          {
            rtext: "An admin is too busy today.\n" +
            "You have tried to configure GUI by yourself but unsuccessfully. \n" +
            "The project is not configured, your mentor is disappointed.",
            chance: 50,
            p1: -15,
            p2: 0
          }
        ]
      }
    ]
  },
  {
    qtext: "You've got your first development task, how to sort out with it in a best way?",
    answers: [
      {
        atext: "I can google everything that I need and resolve the task.",
        results: [
          {
            rtext: "You're lucky because you've found a really nice way to resolve the task.",
            chance: 40,
            p1: 5,
            p2: 12
          },
          {
            rtext: "You've found some info, it helped to you to implement not bad solution.",
            chance: 30,
            p1: 0,
            p2: 7
          },
          {
            rtext: "You've found some solution, but unfortunately, it was wrong, your merge request was declined.",
            chance: 30,
            p1: -10,
            p2: 0
          }
        ]
      },
      {
        atext: "Not sure that Google is enough, better to ask a colleague who sit close to you.",
        results: [
          {
            rtext: "Your colleague is pretty experienced and he gave you a great advice. Your mentor was stunned at how great your solution was.",
            chance: 50,
            p1: 0,
            p2: 7
          },
          {
            rtext: "Your colleague was an intern like you. He has started to work just a few days before. His advice was not so good...",
            chance: 50,
            p1: -15,
            p2: 0
          }
        ]
      }
    ]
  },
  {
    qtext: "Today all tasks are too complex for you and your mentor told you that you will work in pair with an experienced developer. What will you do?",
    answers: [
      {
        atext: "Better to just sit and look at what is doing your colleague, that's how you can learn more.",
        results: [
          {
            rtext: "You were very attentive and your colleague has explained all in a details. You've learned a lot of new things. But it was a little bit boring.",
            chance: 50,
            p1: -10,
            p2: 12
          },
          {
            rtext: "Your colleague worked silently. Looks like he prefers to develop alone. You've tried to understand something by yourself but not all things were clear.",
            chance: 50,
            p1: -10,
            p2: 7
          }
        ]
      },
      {
        atext: "I will listen to explanations of my colleague and try to develop some simple things by myself.",
        results: [
          {
            rtext: "Your day was pretty effective and you've got a positive feedback from your colleague. But you're pretty tired today.",
            chance: 70,
            p1: -15,
            p2: 16
          },
          {
            rtext: "You have tried to write a code, but the task was really difficult. You made so many mistakes. But with help of your colleague you've learned a lot of new things.",
            chance: 30,
            p1: -20,
            p2: 7
          }
        ]
      },
      {
        atext: "I will listen to explanations of my colleague and will make notes about all things which are not clear.",
        results: [
          {
            rtext: "You've learned a lot of things. After the workday, you also studied at home with notes which you've made today. " +
            "At the end of the day, you were very tired but it was a productive day.",
            chance: 100,
            p1: -20,
            p2: 16
          }
        ]
      }
    ]
  },
  {
    qtext: 'Today is weekend. You could spend it for learning or just have a rest.',
    answers: [
      {
        atext: 'I will rest first. I\'ll have time to learn something in the evening.',
        results: [
          {
            rtext: 'You had a good rest during the day, but you didn\'t forget to allocate some time on the evening to prepare for exam. Good job!',
            chance: 50,
            p1: 10,
            p2: 12
          },
          {
            rtext: 'You\'ve promised to yourself that you will study on the evening.' +
            ' But as it happens, you\'ve spent all the day for relax. Not so productive as you planned, but you had a funny day.',
            chance: 50,
            p1: 10,
            p2: 0
          }
        ]
      },
      {
        atext: 'I will study hard whole the day. Rest is for weak!',
        results: [
          {
            rtext: 'You studied whole the weekend day. It was hard but now you feel yourself much more prepared to the exam.',
            chance: 100,
            p1: -20,
            p2: 12
          }
        ]
      },
      {
        atext: 'F*ck this shit! It\'s a weekend! Party hard!',
        results: [
          {
            rtext: 'You had a rest whole the day and now you are full of energy for a new week.',
            chance: 70,
            p1: 15,
            p2: 0
          },
          {
            rtext: 'You had a good rest, seems it was such "good rest" that you even forget something that you\'ve learned before. Sad...',
            chance: 30,
            p1: 15,
            p2: -5
          }
        ]
      }
    ]
  },
  {
    qtext: 'Today is Monday. You have worked on the task and found a bug in an old code, what will you do?',
    answers: [
      {
        atext: 'It\'s not my business, I should concentrate on my task.',
        results: [
          {
            rtext: 'You have ignored a bug, but actually, it was related to a feature which you have worked on.' +
            ' Don\'t forget that you a part of the team!',
            chance: 100,
            p1: 0,
            p2: 7
          }
        ]
      },
      {
        atext: 'I will ask QA to report this bug.',
        results: [
          {
            rtext: 'Good decision. But don\'t forget that not all bugs can be reported by QA. Some of them require an attention of developers.',
            chance: 100,
            p1: 5,
            p2: 10
          }
        ]
      },
      {
        atext: 'I will report this bug by myself.',
        results: [
          {
            rtext: 'Good decision. But sometimes you can ask QA to report the bug also, if you think that they can reproduce it.',
            chance: 100,
            p1: 5,
            p2: 10
          }
        ]
      }
    ]
  },
  {
    qtext: 'You have three tasks. Which one will you do?',
    answers: [
      {
        atext: 'You need to build few listings. It looks like kind of medium task.',
        results: [
          {
            rtext: 'You have successfully completed this task. Good job.',
            chance: 70,
            p1: 5,
            p2: 12
          },
          {
            rtext: 'You have faced with some problems and to the end of the day your task was only half ready. Not bad.',
            chance: 30,
            p1: 0,
            p2: 8
          }
        ]
      },
      {
        atext: 'You need to correct the output of some text and add translations for text. It look pretty simple',
        results: [
          {
            rtext: 'Success! Yes, sure, the task was so easy.',
            chance: 100,
            p1: 5,
            p2: 5
          }
        ]
      },
      {
        atext: 'An integration with a payment system. Pretty risky task.',
        results: [
          {
            rtext: 'You have worked hard whole the day and you have achieved success. Good job!',
            chance: 30,
            p1: 10,
            p2: 20
          },
          {
            rtext: 'This task is very difficult for a beginner. You didn\'t finish it.',
            chance: 70,
            p1: 0,
            p2: 5
          }
        ]
      }
    ]
  }
];
