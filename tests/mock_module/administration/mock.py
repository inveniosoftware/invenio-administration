# SPDX-FileCopyrightText: 2022 CERN.
# SPDX-FileCopyrightText: 2024 Graz University of Technology.
# SPDX-License-Identifier: MIT
"""Mock view for testing."""

from invenio_administration.views.base import AdminResourceListView


class MockView(AdminResourceListView):
    """Creates a mock AdminView for testing.

    resource_config must match the mock resource's name
    """

    name = "mock"
    category = "Test category"
    url = "mocked_details_url"
    resource_config = "mocks"


class MockViewAlternate(AdminResourceListView):
    """Creates a mock AdminView for testing.

    resource_config must match the mock resource's name
    """

    name = "mock alternate"
    category = "Test category"
    resource_config = "mocks"
    # url is None to force the name to be used as url
