---
title: Git commit 규칙
date: "2019-06-27T23:12"
---

저는 개발을 할 때 나만의 규칙을 정하고 일관된 방식으로 하는 것을 좋아합니다. 이참에 git commit에 대한 저만의 규칙을 정리하고자 합니다.
포스트에 정리한 규칙들은 commit 헤더로 사용할 키워드들입니다. 현재 정리된 내용을 골자로, 필요한 키워드들을 계속 추가할 예정입니다.

### \# 구현

- Feat
> Feature commit.<br />
> 기능 개발을 본격적으로 하기 전 기본 뼈대 구축할 때 사용.

- Add
> Addition commit<br />
> 기존에 없던 기능을 새롭게 추가할 때 사용.

- Update
> Updation commit<br />
> 기존에 있던 기능을 변경하거나, 구조를 변경할 때 사용.

- Delete
> Deletion commit<br />
> 기존의 파일 및 로직 제거할 때 사용.

- Fix
> Fix commit<br />
> 발생된 이슈 개선하였을 때 사용.

- Refactor
> Refactoring commit<br />
> 아키텍처 및 코드 리팩토링 작업 시 사용.

### \# 설정 작업

- Conf
> Configuration commit<br />
> 프로젝트 개발환경 및 설정 값 변경할 때 사용. 
> ex) .gitignore 수정, 도메인 변경 등..

- Path
> Path commit<br />
> 프로젝트의 디렉토리 구조 변경하였을 때 사용.

#### \# 문서 작업

1. Docs
> Documents commit<br />
> .md 파일과 같은 문서 작업하였을 때 사용.

2. Post
> Post commit<br />
> 블로그 포스팅을 위해 글 작성하였을 때 사용.
