# Alexander-bot design crowdsourcing 

## Requirments

- NodeJS
- Mysql
- Mail service
- Google webservices
- OpenAI webservices

This software is built using NodeJS, React and MySQL.
## Install

Make sure you run node 14.x.

Clone the source code from git and install the dependencies:

Create and edit a local JSON configuration file:

```sh
vi config/local.json
```

### Configuration settings

The default configuration settings can be viewed in the `config/default.json` file. Do not change this file since it might change in the future.

Edit the experiment consent form in : `config/consent.html`

TO have TTS and STT (speech engines) you must get access to Google's could and set up the credentials.
Import google credentials (example location)
```bash
export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/service-account-file.json"
```

Run database migrations:
```bash
npx sequelize-cli db:migrate
```

Run seeds:
```bash
npx sequelize-cli db:seed:all
```

## Production

Build the react code and start the web application.

```sh
cd client
npm run build
node start

cd ..
cd server
npm start
```



<!-- INSERT INTO `TaskBlocks` (`id`, `kind`, `status`, `strategy`, `createdAt`, `updatedAt`, `hierarchyLevel`, `parentId`, `ProjectId`) VALUES (NULL, 'CreateSchema', 'progress', 'creative', '2022-06-22 15:15:35.000000', '2022-06-22 15:15:35.000000', NULL, '6', '1'); -->


INSERT INTO `TaskBlocks` (`id`, `kind`, `status`, `strategy`, `createdAt`, `updatedAt`, `hierarchyLevel`, `parentId`, `ProjectId`) VALUES (NULL, 'Critique', NULL, 'creative', '2022-06-28 16:20:21.000000', '2022-06-28 16:20:21.000000', NULL, '7', '1');

INSERT INTO `Tasks` (`id`, `kind`, `status`, `payment`, `timeEstimation`, `createdAt`, `updatedAt`, `ProjectId`, `TaskBlockId`, `ParticipantId`, `ArtifactId`) VALUES (NULL, 'Critique', 'progress', '0', '0', '2022-06-28 16:21:14.000000', '2022-06-28 16:21:14.000000', '1', '8', '1', NULL);

<!-- insert into ArtifactCritiques (select null, "critique", b.content, b.createdAt, b.updatedAt, b.ArtifactId, b.ParticipantId, b.TaskId from Briefs as b where b.isValid='1' and ArtifactId is not null); -->


<!-- Create Model -->
INSERT INTO `TaskBlocks` (`id`, `kind`, `status`, `strategy`, `createdAt`, `updatedAt`, `hierarchyLevel`, `parentId`, `ProjectId`) VALUES (NULL, 'CreateModel', NULL, 'creative', '2022-06-28 16:20:21.000000', '2022-06-28 16:20:21.000000', NULL, '8', '1');


INSERT INTO `Tasks` (`id`, `kind`, `status`, `payment`, `timeEstimation`, `createdAt`, `updatedAt`, `ProjectId`, `TaskBlockId`, `ParticipantId`, `ArtifactId`) VALUES (NULL, 'CreateSchema', 'progress', '0', '0', '2022-06-28 16:21:14.000000', '2022-06-28 16:21:14.000000', '1', '9', '1', NULL);

TRUNCATE `ArtifactCritiques`;
insert into ArtifactCritiques (select null, "critique", b.content, b.createdAt, b.updatedAt, b.ArtifactId, b.ParticipantId, b.TaskId from Briefs as b where b.isValid='1' and ArtifactId is not null);

<!-- INSERT INTO `Tasks` (`id`, `kind`, `status`, `payment`, `timeEstimation`, `createdAt`, `updatedAt`, `ProjectId`, `TaskBlockId`, `ParticipantId`, `ArtifactId`) VALUES (NULL, 'CreateSchema', 'progress', '0', '0', '2022-06-28 16:21:14.000000', '2022-06-28 16:21:14.000000', '1', '9', '126', NULL); -->
remove upload
9bd885dd-de92-4615-9a3a-a234ed124ae8
727e103e-00f7-4362-b871-2500009bb2e0

Split
508bd3e3-bdd4-4184-b08e-c6b2a59fcc89.jpg
4becc639-0028-49e5-a079-b6e9eb25def0.jpg


INSERT INTO `ArtifactUploads` (`file`, `createdAt`, `updatedAt`, `ArtifactId`, `ParticipantId`) VALUES
('upload/508bd3e3-bdd4-4184-b08e-c6b2a59fcc89-a.jpg', '2022-06-26 18:24:51', '2022-06-26 18:25:23', 37, 141),
('upload/508bd3e3-bdd4-4184-b08e-c6b2a59fcc89-b.jpg', '2022-06-26 18:24:51', '2022-06-26 18:25:23', 37, 141),
('upload/508bd3e3-bdd4-4184-b08e-c6b2a59fcc89-c.jpg', '2022-06-26 18:24:51', '2022-06-26 18:25:23', 37, 141);

INSERT INTO `ArtifactUploads` ( `file`, `createdAt`, `updatedAt`, `ArtifactId`, `ParticipantId`) VALUES
( 'upload/4becc639-0028-49e5-a079-b6e9eb25def0-a.jpg', '2022-06-25 01:49:49', '2022-06-25 01:50:28', 34, 129),
( 'upload/4becc639-0028-49e5-a079-b6e9eb25def0-b.jpg', '2022-06-25 01:49:49', '2022-06-25 01:50:28', 34, 129);


Remove junk
update `Artifacts` set active=0 WHERE id in(39,42);

DELETE FROM `ArtifactUploads` WHERE id in(92,94,97,90)


<!-- Insert tasks -->
update Tasks set status="fail" where status="progress" and taskBlockId=7;
INSERT INTO `TaskBlocks` (`id`, `kind`, `status`, `strategy`, `createdAt`, `updatedAt`, `hierarchyLevel`, `parentId`, `ProjectId`) VALUES (NULL, 'Critique', 'progress', 'creative', '2022-06-29 14:01:09.000000', '2022-06-29 14:01:09.000000', NULL, '7', '1');
INSERT INTO `Tasks` select null, 'Critique', 'progress', '0', '0', now(), now(), '1', '8', Participants.id, NULL from Participants;




INSERT INTO `TaskBlocks` (`id`, `kind`, `status`, `strategy`, `createdAt`, `updatedAt`, `hierarchyLevel`, `parentId`, `ProjectId`) VALUES (NULL, 'Critique', NULL, 'creative', '2022-07-17 19:00:49.000000', '2022-07-17 19:00:49.000000', NULL, '9', '1');

Inset models
INSERT INTO `ArtifactUploads` (`id`, `file`, `createdAt`, `updatedAt`, `ArtifactId`, `ParticipantId`) VALUES (NULL, 'https://3dwarehouse.sketchup.com/embed/7ed3f4c5-a2e2-49a4-95d8-d7b7eb5db012?token=rqzyKtC7rhA=&binaryName=s21', '2022-07-18 11:04:07.000000', '2022-07-18 11:04:07.000000', '46', NULL);

INSERT INTO `ArtifactUploads` (`id`, `file`, `createdAt`, `updatedAt`, `ArtifactId`, `ParticipantId`) VALUES (NULL, 'https://3dwarehouse.sketchup.com/embed/0f25b521-13ba-46be-8ca6-efc011723d8f?token=khBTyah36Ao=&binaryName=s22', '2022-07-18 11:04:07.000000', '2022-07-18 11:04:07.000000', '48', NULL);

INSERT INTO `ArtifactUploads` (`id`, `file`, `createdAt`, `updatedAt`, `ArtifactId`, `ParticipantId`) VALUES (NULL, 'https://3dwarehouse.sketchup.com/embed/4fc4d4ad-546d-4b21-bb0f-529b73d384ea?token=Bm8kKtIPGIU=&binaryName=s21', '2022-07-18 11:04:07.000000', '2022-07-18 11:04:07.000000', '49', NULL);

INSERT INTO `ArtifactUploads` (`id`, `file`, `createdAt`, `updatedAt`, `ArtifactId`, `ParticipantId`) VALUES (NULL, 'https://3dwarehouse.sketchup.com/embed/c7787da1-baaa-4c33-9689-811e7fd0f779?token=umiZqxcrFmk=&binaryName=s21', '2022-07-18 11:04:07.000000', '2022-07-18 11:04:07.000000', '45', NULL);

UPDATE `Artifacts` SET `active` = '0' WHERE `Artifacts`.`id` in (50,47);


INSERT INTO `Tasks` select null, 'Critique', 'progress', '0', '0', now(), now(), '1', '10', Participants.id, NULL from Participants;


<!-- Final task -->
INSERT INTO `TaskBlocks` (`id`, `kind`, `status`, `strategy`, `createdAt`, `updatedAt`, `hierarchyLevel`, `parentId`, `ProjectId`) VALUES (11, 'CreatePlan', 'progress', 'creative', '2022-07-24 14:29:32.000000', '2022-07-24 14:29:32.000000', NULL, '10', '1'), (12, 'FinalMeeting', 'progress', 'creative', '2022-07-24 14:29:32.000000', '2022-07-24 14:29:32.000000', NULL, '10', '1');

INSERT INTO `Tasks` select null, 'FinalMeeting', 'progress', '0', '0', now(), now(), '1', '12', Participants.id, NULL from Participants;


INSERT INTO `Tasks` ('FinalMeeting', 'progress', '0', '0', now(), now(), '1', '12', Participants.id, NULL from Participants;


INSERT INTO `Tasks` (`id`, `kind`, `status`, `payment`, `timeEstimation`, `createdAt`, `updatedAt`, `ProjectId`, `TaskBlockId`, `ParticipantId`, `ArtifactId`) VALUES
(null, 'CreatePlan', 'todo', 0, 0, '2022-07-24 14:58:01', '2022-07-24 14:58:01', 1, 11, 1, null)