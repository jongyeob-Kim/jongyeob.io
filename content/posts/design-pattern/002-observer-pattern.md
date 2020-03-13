---
title: "[디자인 패턴] 옵저버 패턴 (Observer Pattern)"
date: "2020-02-15T15:30"
template: "post"
draft: false
slug: "/posts/design-pattern/observer-pattern/"
category: "디자인 패턴"
tags:
  - "디자인 패턴"
  - "옵저버 패턴"
description: "한 객체(주제)의 상태가 바뀌면 그 객체에 의존하는 모든 객체(옵저버)에게 자신의 상태가 변경되었음을 알려주는 디자인 패턴이다. 관찰 대상 객체를 주제(Subject), 관찰하는 객체를 옵저버(Observer)라 명명한다. 옵저버는 주제에 의존하는 객체이다."
socialImage: "/media/010-observer-pattern-1.jpg"
---

## 1. 옵저버 패턴 정의

한 객체(주제)의 상태가 바뀌면 그 객체에 의존하는 모든 객체(옵저버)에게 자신의 상태가 변경되었음을 알려주는 디자인 패턴이다.
<br />
관찰 대상 객체를 주제(Subject), 관찰하는 객체를 옵저버(Observer)라 명명한다. 옵저버는 주제에 의존하는 객체이다. 주제를 관찰하고자 하는 객체를 옵저버로 등록하고, 주제의 상태가 변경될 때마다 알림을 받을 수 있다. 개별 옵저버는 주제의 변경 알림을 받고 특정 행동을 수행하게 된다.

![옵저버 패턴 위키이미지](/media/010-observer-pattern-1.jpg)

[위키피디아](https://ko.wikipedia.org/wiki/%EC%98%B5%EC%84%9C%EB%B2%84_%ED%8C%A8%ED%84%B4)에서는 옵저버 패턴을 위와 같이 정의하고 도식화 하고 있다.


## 2. 옵저버 패턴을 적용하지 않는다면 ?

먼저 옵저버 패턴을 적용하지 않고 옵저버 구조를 구현해보자.

**<예제>**
<br />
구독 시스템을 구현하려고 한다. 기술 블로그에 새로운 글이 올라오면 등록된 개별 구독 플랫폼으로 알림을 보내는 시스템이다.
<br />
(1) 주제 : 기술 블로그
<br />
(2) 옵저버 : 구독 플랫폼 (메일, 슬랙)

```java
// 글 정보 담는 객체
public class Article {
    private String title;
    private String content;

    // getter/setter, toString
}
```

```java
// 새글 알리미
public class TechBlog {
    // 구독 플랫폼
    private MailPlatform mailPlatform;
    private SlackPlatform slackPlatform;
    private Article article;

    public TechBlog(
        MailPlatform mailPlatform,
        SlackPlatform slackPlatform) {
        this.mailPlatform = mailPlatform;
        this.slackPlatform = slackPlatform;
    }

    // 클라이언트는 새로운 글을 등록한다.
    public void newPosting(Article article) {
        this.article = article;
        // 새글이 등록되었음을 개별 플랫폼에게 알려준다.
        mailPlatform.update(article);
        slackPlatform.update(article);
    }
}
```

간단하게 구독 시스템을 구현해봤다. 새 글이 등록되면 개별 플랫폼(메일, 슬랙)은 알림을 받기 때문에 신규 글이 올라왔음을 알 수 있다.
<br />
예제 코드에서 문제가 될만한 부분은 없는지 생각해보자.

예상 가는 문제점
- (1) 구체적인 구현에 의존하기 때문에 서로 강하게 결합되어 있다.
- (2) 동일한 새글 알림 구조를 반복해서 작성해야 한다.
- (3) 구독 플랫폼이 추가되는 경우 클래스의 수정이 발생한다.

```java
public void newPosting(Article article) {
    mailPlatform.update(article);
    slackPlatform.update(article);
}
```

실제 구현체에 의존하는 강결합 관계를 약결합 구조로 변경한다면, 세 가지 문제점을 해결 할 수 있을 것이다. 다음 파트에서 약한 결합 구조를 만드는 방법을 확인해보자.


## 3. 느슨한 결합 (Loose Coupling)

예제에서 발생한 가장 큰 문제는 '새 글 알리미'가 의존하는 객체('구독 플랫폼')의 실제 구현체를 알고 있다는 것이다. 의존하는 객체의 실제 구현체를 알고 있다는 것은 해당 객체의 변경에 예민하게 반응해야 한다는 것을 의미한다.
<br />
문제 해결을 위해 변경에 닫혀있는 설계를 하려면 객체 간의 의존 관계를 인터페이스를 이용해 느슨한 결합 구조로 만들어야 한다. 여기서 `느슨한 결합이란 상호 작용하는 두 객체가 서로에 대해 잘 모른다는 것을 의미한다.` 객체가 서로 소통하기 위해 인터페이스라는 `공통 규약`을 정하고, 구독 플랫폼에 변경이 발생하든 새로운 플랫폼이 추가되든 동일한 인터페이스를 따르도록 제한을 두는 것이다.


인터페이스를 이용해 예제를 느슨한 결합 구조로 만들어보자.

```java
// 구독 플랫폼 인터페이스
public interface Observer {
    update(Article article);
}

// 구독 플랫폼 구현체
public class MailPlatform implements Observer {
    public void udpate(Article article) {
        System.out.println("메일로 새글 등록 알림");
    }
}
public class SlackPlatform implements Observer {
    public void udpate(Article article) {
        System.out.println("슬랙으로 새글 등록 알림");
    }
}
```

```java
// 새글 알림을 담당하는 '기술 블로그'
public class TechBlog {
    // 구독 플랫폼
    private Observer observer;   // 인터페이스를 사용한 느슨한 결합 
    private Article article;

    public TechBlog(Observer observer) {
        this.observer = observer;
    }

    // 클라이언트는 새로운 글을 등록한다.
    public void newPosting(Article article) {
        this.article = article;
        // 새글이 등록되었음을 개별 플랫폼에게 알려준다.
        observer.update(article);
    }
}
```

인터페이스를 이용해 객체 간에 느슨한 결합 관계를 만들었다. 

본래 의도했던 개방 폐쇄 원칙을 따르는 코드를 구현했지만, 또 다른 문제가 발생했다. 인터페이스를 사용한 참조 변수(observer)는 한 객체만을 참조할 수 있기 때문에 여러개의 구독 플랫폼을 등록하는 것이 불가능해졌다.

이제 `옵저버 패턴`을 적용해서 문제점을 해결한 깔끔한 구독 시스템을 만들어보자.


## 4. 옵저버 패턴 적용하기

![옵저버 패턴](/media/010-observer-pattern-2.jpg)

옵저버 패턴에서 주제와 옵저버는 1:N 관계를 가진다. 하나의 주제가 여러개의 옵저버에게 변경사항을 알려줄 수 있는 것이다. 주제는 관찰 대상이고, 옵저버를 관찰자라고 생각하면 된다. 
<br />
예제에서는 '새 글 알리미'가 주제, '구독 플랫폼'이 옵저버 역할을 한다. 구독 플랫폼은 여러개가 될 수 있다.

옵저버 패턴을 적용한 예제 코드의 UML 구조이다.

![옵저버 패턴 UML](/media/010-observer-pattern-3.jpg)

주제 인터페이스 먼저 살펴보자.
- registerObserver() 메소드 : 옵저버 등록
- removeObserver() 메소드 : 옵저버 등록 취소
- notifyObservers() 메소드 : 등록된 옵저버에 상태 변경 알림

옵저버 인터페이스
- update() 메소드 : 주제 객체의 상태 변경 수신 메소드

옵저버 패턴에는 푸시 방식과 풀 방식 두 종류가 존재한다. 두 방식을 정리하고 각각 구현해보자. 먼저 공통 주제 인터페이스이다.

공통 주제 인터페이스

```java
public interface Subject {
    registerObserver(Observer observer);
    removeObserver(Observer observer);
    notifyObservers();
}
```

#### (1) 푸시(Push) 방식

주제 객체에서 상태 변경을 옵저버에게 알릴 때, 변경된 데이터를 함께 보내는 방식이다.

```java
// 옵저버 인터페이스
public interface Observer {
    update(Article article);
}

// 옵저버 구현체
public class MailPlatform implements Observer {
    public void udpate(Article article) {
        System.out.println("메일로 새글 등록 알림");
        System.out.println(article);
    }
}
public class SlackPlatform implements Observer {
    public void udpate(Article article) {
        System.out.println("슬랙으로 새글 등록 알림");
        System.out.println(article);
    }
}
```

```java
// 주제 객체
public class TechBlog implements Subject {
    private List<Observer> observers;
    private Article article;

    public TechBlog(List<Observer> observers) {
        this.observers = observers;
    }

    public void registerObserver(Observer observer) {
        // 옵저버 등록
        observers.add(observer);
    }

    public void removeObserver(Observer observer) {
        int idx = observers.indexOf(observer);

        if (idx >= 0) {
            // 옵저버 삭제
            observers.remove(idx);
        }
    }

    public void notifyObservers() {
        for (Observer observer : observers) {
            // 등록된 모든 옵저버에게 새 글 정보를 전달한다.
            observer.update(article);
        }
    }

    public void newPosting(Article article) {
        this.article = article;
        notifyObservers();
    }
}
```

#### (2) 풀(Pull) 방식

주제 객체로부터 변경 알림을 받고 옵저버 객체에서 변경된 데이터를 직접 가져가는 방식이다. 옵저버가 관찰하는 데이터가 많거나 옵저버마다 관찰하는 데이터가 다를 때 사용하는 방식이다.

옵저버 인터페이스의 update() 메소드는 매개변수로 주제 인터페이스를 전달받는다.

```java
// 옵저버 인터페이스
public interface Observer {
    update(Subject subject);  // 매개변수로 주제 인터페이스를 받는다.
}

// 옵저버 구현체
public class MailPlatform implements Observer {
    public void udpate(Subject subject) {
        System.out.println("메일로 새글 등록 알림");
        // TechBlog 타입으로 형변환
        if (subject instanceof TechBlog) {
            TechBlog techBlog = (TechBlog) subject;
            Article article = techBlog.getArticle();
            System.out.println(article);
        }
    }
}
public class SlackPlatform implements Observer {
    public void udpate(Subject subject) {
        System.out.println("슬랙으로 새글 등록 알림");
        // TechBlog 타입으로 형변환
        if (subject instanceof TechBlog) {
            TechBlog techBlog = (TechBlog) subject;
            Article article = techBlog.getArticle();
            System.out.println(article);
        }
    }
}
```

푸시 방식과 달리 옵저버에서 능동적으로 글 정보(Article)를 참조할 수 있도록 getter를 구현한다.

```java
// 주제 객체
public class TechBlog implements Subject {
    private List<Observer> observers;
    private Article article;

    public TechBlog(List<Observer> observers) {
        this.observers = observers;
    }

    public void registerObserver(Observer observer) {
        // 옵저버 등록
        observers.add(observer);
    }

    public void removeObserver(Observer observer) {
        int idx = observers.indexOf(observer);

        if (idx >= 0) {
            // 옵저버 삭제
            observers.remove(idx);
        }
    }

    public void notifyObservers() {
        for (Observer observer : observers) {
            // 등록된 모든 옵저버에게 새 글 등록 알림을 보낸다.
            observer.update(this);
        }
    }

    public void newPosting(Article article) {
        this.article = article;
        notifyObservers();
    }
    
    // 글 정보 반환
    public Article getArticle() {
        return article;
    }
}
```

정리하면 푸시 방식은 데이터를 주제가 옵저버에게 직접 전달하는 방식, 풀 방식은 옵저버가 주제에게 알림을 받은 뒤 데이터를 가져오는 방식이다.
<br />
푸시 방식의 장점은 데이터의 제어를 주제 객체만이 하기 때문에 옵저버에게 자기 자신을 많이 드러내지 않아도 된다는 것이다. 풀 방식의 장점은 옵저버 객체에서 원하는 데이터가 각기 다를 때, 개별적으로 데이터를 가져올 수 있다는 데 있다.
<br />
상황에 따라 푸시 방식, 풀 방식을 구분해서 사용하는 것도 옵저버 패턴을 활용하는 중요한 요소이다.


## 5. 옵저버 패턴을 쓰면 어떤 점이 좋을까 ?

- 객체 간의 관계를 인터페이스를 활용해 **느슨한 결합** 구조를 만들 수 있다.
- 한 객체(주제)의 상태 변화를 의존하는 객체(옵저버)에서 **자동으로 알 수** 있다.
- 의존 관계가 **1:N** 이기 때문에 의존하는 객체(옵저버)를 여러개 만들 수 있다.
- 런타임에 의존 관계를 생성하거나 삭제할 수 있다.


## 💡정리하기

옵저버 패턴은 한 객체(주제)의 상태가 바뀌면 그 객체에 의존하는 모든 객체(옵저버)에게 자신의 상태가 변경되었음을 알려주는 디자인 패턴이다. 의존하는 객체의 상태 변화를 직접 확인하는 것이 아니라, 의존하는 객체가 자동으로 알려주기 때문에 불필요한 코드를 줄일 수 있다.

옵저버 패턴을 예제처럼 직접 구현할 수도 있지만, JDK에서 제공하는 java.util.Observable과 java.util.Observer를 활용해 구현할 수 있다. 이번 포스팅은 옵저버 패턴의 개념에 대해 소개하는 글이기에 해당 내용은 생략하였다. JDK 지원 기능을 활용한 옵저버 패턴 구현은 다른 포스팅에서 다룰 예정이다.

디자인 패턴을 공부하면서 유연한 코드를 위한 인터페이스의 중요성을 다시금 느끼게 된다.

> 전체 코드는 [Github](https://github.com/im-yeobi/blog-sample-code/tree/master/design-pattern/observer-pattern)을 확인해주세요.