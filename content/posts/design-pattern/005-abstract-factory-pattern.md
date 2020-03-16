---
title: "[디자인 패턴] 팩토리 패턴 (2) - 추상 팩토리 패턴 (Abstract Factory Pattern)"
date: "2020-03-14T10:00"
template: "post"
draft: false
slug: "/posts/design-pattern/factory-pattern-2/"
category: "디자인 패턴"
tags:
  - "디자인 패턴"
  - "팩토리 패턴"
  - "추상 팩토리 패턴"
description: "추상 팩토리 패턴은 다양한 구성 요소별로 `객체의 집합(군)`을 만들기 위한 디자인 패턴이다. 추상 팩토리를 사용하는 클라이언트에서는 추상 인터페이스를 통해 일련의 객체의 군을 공급받을 수 있다. 이때, 클라이언트에서는 실제로 어떤 객체가 생성되었는지 알 필요가 없다. 따라서 클라이언트와 팩토리에서 생성되는 객체를 분리할 수 있다."
socialImage: "/media/015-abstract-factory-pattern-1.png"
---

이번 포스팅에서는 이전에 다뤘던 팩토리 메소드 패턴에 이어 또 다른 팩토리 패턴 중 하나인 추상 팩토리 패턴을 다루고자 한다.
<br />
팩토리 메소드 패턴이 무엇인지 잘 모른다면 👉[포스팅 : 팩토리 메소드 패턴](https://im-yeobi.io/posts/design-pattern/factory-pattern-1/)을 참고하자.


## 1. 추상 팩토리 패턴 정의

![추상 팩토리 패턴 구조](/media/015-abstract-factory-pattern-1.png)

추상 팩토리 패턴은 다양한 구성 요소 별로 `객체의 집합(군)`을 만들기 위한 디자인 패턴이다. 추상 팩토리를 사용하는 클라이언트에서는 추상 인터페이스를 통해 일련의 객체의 군을 공급받을 수 있다. 이때, 클라이언트에서는 실제로 어떤 객체가 생성되었는지 알 필요가 없다. 따라서 클라이언트와 팩토리에서 생성되는 객체를 `분리`시킬 수 있다.

위 다이어그램에서 보면 AbstractFactory 추상 팩토리를 상속 받은 ConcreteFactory1, ConcreteFactory2 두 개의 구상 클래스가 있다. 각각의 구상 클래스는 서로 다른 `객체의 집합`을 의미한다. 즉, ConcreteFactory1 형식에 맞는 제품 군, ConcreteFactory2 형식에 맞는 제품 군을 이루고 있는 것이다.


## 2. 추상 팩토리 패턴 적용 예제

팩토리 메소드 패턴에서 사용했던 예제를 좀 더 확장해보자. 유럽 스타일의 병원/대학 건물을 짓는 방식, 아시아 스타일의 병원/대학 건물을 짓는 방식이 서로 다르고 사용되는 자재도 각기 다르다. 건축 방식에 따라 '사용되는 자재'들을 **제품군**이라고 한다. 여기서 자재는 건물을 짓기 위한 구성 요소이고, 건축 방식에 맞게 일관된 제품군을 유지해야 한다.

시멘트와 목재 두 종류의 자재가 있다. 추상 팩토리를 이용해 각각의 건축 방식에 맞는 자재군을 만들어보자.

### 구성요소

![구성요소](/media/015-abstract-factory-pattern-2.jpg)

- 시멘트
   - 포틀랜드(Portland)
   - 혼합(Mixture)
- 목재
   - 참나무(Oak)
   - 호두나무(Walnut)

### 추상 팩토리 설계하기

![추상 팩토리 설계](/media/015-abstract-factory-pattern-3.jpg)

유럽 스타일, 아시아 스타일에 맞는 자재 객체를 생성할 수 있는 추상 팩토리를 설계했다. 자재 팩토리 입장에서 클라이언트는 건축 방식(AsiaStyleHospital, EuropeStyleUniversity 등) 객체이다. 클라이언트가 추상 팩토리에게 자재 성성을 요청하면 아시아/유럽 스타일에 맞는 자재 객체를 생성해 클라이언트에게 전달한다.

아래 코드를 보자. 자재 객체를 구현하는 코드는 내용이 길어질 것 같아 생략하였다. 👉[전체 코드 : Github](https://github.com/im-yeobi/blog-sample-code/tree/master/design-pattern/abstract-factory-pattern)에서 확인 가능하다.

```java
// 추상 팩토리를 위한 인터페이스
public interface BuildingMaterialsFactory {
  public Cement createCement();
  public Wood createWood();
}
```

```java
// 유럽 자재 공장
public class EuropeMaterialsFactory implements BuildingMaterialsFactory {
  public Cement createCement() {
    return new MixtureCement();
  }

  public Wood createWood() {
    return new WalnutWood();
  }
}

// 아시아 자재 공장
public class AsiaMaterialsFactory implements BuildingMaterialsFactory {
  public Cement createCement() {
    return new PortlandCement();
  }

  public Wood createWood() {
    return new OakWood();
  }
}
```

### 클라이언트 코드

```java
// 유럽 스타일 병원 건축 방식
public class EuropeStyleUniversity extends Building {
  private BuildingMaterialsFactory materialsFactory;

  public EuropeStyleUniversity(BuildingMaterialsFactory materialsFactory) {
    this.materialsFactory = materialsFactory;
    super.name = "유럽 스타일 대학 건물";
  }

  @Override
  public void buildFoundation() {
    System.out.println("Build a foundation");
    // 팩토리에게 자재 생성 요청
    super.cement = materialsFactory.createCement();
    super.wood = materialsFactory.createWood();
  }
}

// 유럽 건설사
public class EuropeConstructionFirm extends ConstructionFirm {
  @Override
  public Building getBuildingInstance(BuildingType type) {
    Building building = null;

    // 자재 생성을 위한 팩토리
    BuildingMaterialsFactory materialsFactory = new EuropeMaterialsFactory();

    // 객체 생성부
    switch (type) {
      case HOSPITAL:
        building = new EuropeStyleHospital(materialsFactory);
        break;
      case UNIVERSITY:
        building = new EuropeStyleUniversity(materialsFactory);
        break;
    }

    return building;
  }
}
```

유럽식, 아시아식 자재 객체의 집합을 만들어두었으니, 클라이언트에서 이를 활용하기만 하면 된다. 자재 객체 생성을 요청하는 클라이언트에서는 자재 생성 팩토리가 어떤 구현체인지 알 필요가 없다. 핵심 코드는 건축 방식 객체의 인스턴스를 생성할 때, 인자값으로 자재 팩토리를 넘겨주는 부분이다.

```java
building = new EuropeStyleHospital(materialsFactory);
...
building = new EuropeStyleUniversity(materialsFactory);
```

### 클라이언트를 포함한 전체 설계도

![전체 설계도](/media/015-abstract-factory-pattern-4.jpg)


## 💡정리하기

추상 팩토리 패턴은 **연관된 객체들의 집합을 형성**할 때 이용하는 디자인 패턴이다. 객체들의 집합을 추상화시키고 클라이언트에게 추상화된 인터페이스를 제공한다. 이렇게 하면 클라이언트에서는 일관되게 객체를 전달 받아 사용할 수 있게 된다.

지금까지 정리한 **팩토리 메소드 패턴**과 **추상 팩토리 패턴**의 차이점을 알아보고 팩토리 패턴에 대한 포스팅을 끝내고자 한다.

### 팩토리 메소드 패턴과 추상 팩토리 패턴 차이점

둘 다 객체를 만들기 위한 **팩토리**이지만 명확하게 차이점을 이해하고 있어야 상황에 알맞게 패턴을 적용할 수 있다.

- 팩토리 메소드 패턴
   - 상속을 통해 객체를 만든다.
   - 팩토리 메소드 패턴을 이용해 객체를 만들 때는 수퍼 클래스를 확장하고 팩토리 메소드를 오버라이드 해야 한다.
   - 객체 생성을 담당하는 팩토리가 서브 클래스에 구현되어 있다.
   - 일반적으로 한 가지 객체를 생성할 때 사용한다.

- 추상 팩토리 패턴
   - 객체 구성을 통해 만든다.
   - 연관된 객체들의 집합을 만들기 위한 추상 형식을 제공한다.
   - 제품이 생상되는 방법은 추상 형식의 서브 클래스에 정의된다.
   - 여러 객체를 하나의 응집화된 군을 만들 때 사용한다.

팩토리 메소드 패턴과 추상 팩토리 패턴은 객체 생성을 캡슐화 힌다는 공통점이 있다. 이러한 디자인 패턴을 활용하여 객체 간의 느슨한 결합 관계를 만들고, 특정 구현에 의존하지 않는 설계를 할 수 있다.

> 전체 코드는 [Github](https://github.com/im-yeobi/blog-sample-code/tree/master/design-pattern/abstract-factory-pattern)을 확인해주세요.