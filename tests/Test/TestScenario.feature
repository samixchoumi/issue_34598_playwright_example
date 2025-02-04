Feature: Test issue 34598

  Background:
    Given I am logged in

  @failing-test
  Scenario: Failing test (if cookie validation removed)
    Then I should not see google image

  @failing-test
  Scenario Outline: Failing multiple test (if cookie validation removed)
    Then I should not see <inputToFind> input

    Examples:
      | inputToFind       |
      | Google Search     |
      | I'm Feeling Lucky |

  @success-test
  Scenario: Success test (if cookie validation removed)
    Then I should see google image

  @success-test
  Scenario Outline: Success multiple test (if cookie validation removed)
    Then I should see <inputToFind> input

    Examples:
      | inputToFind       |
      | Google Search     |
      | I'm Feeling Lucky |